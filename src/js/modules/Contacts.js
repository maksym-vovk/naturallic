const Contacts = (function () {
    function getUserCityCountryFromIp() {
        return fetch('https://api.ipify.org?format=json', {
            headers: { Accept: 'application/json' }
        })
            .then(function (res) {
                if (!res.ok) throw new Error('Failed to fetch IP: ' + res.status);
                return res.json();
            })
            .then(function (ipData) {
                return fetch('https://ipapi.co/' + ipData.ip + '/json/', {
                    headers: { Accept: 'application/json' }
                });
            })
            .then(function (geoRes) {
                if (!geoRes.ok) throw new Error('Failed to geolocate IP: ' + geoRes.status);
                return geoRes.json();
            })
            .then(function (geoData) {
                return {
                    city: geoData.city || '',
                    country: geoData.country_name || ''
                };
            })
            .catch(function () {
                return { city: '', country: '' };
            });
    }

    function setupCaptcha(form) {
        var wrapper = form.querySelector('[data-captcha-wrapper]');
        var questionEl = wrapper ? wrapper.querySelector('[data-captcha-question]') : null;
        var inputEl = wrapper ? wrapper.querySelector('[data-captcha-input]') : null;
        var errorEl = wrapper ? wrapper.querySelector('[data-captcha-error]') : null;

        if (!wrapper || !questionEl || !inputEl) {
            return {
                validate: function () { return true; },
                reset: function () {}
            };
        }

        function regenerate() {
            var a = Math.floor(Math.random() * 10) + 1;
            var b = Math.floor(Math.random() * 10) + 1;

            wrapper.dataset.captchaAnswer = String(a + b);
            questionEl.textContent = questionEl.dataset.captchaQuestionText + ' ' + a + ' + ' + b + '?';
            inputEl.value = '';
            inputEl.classList.remove('valid-err');
            if (errorEl) errorEl.style.display = 'none';
        }

        regenerate();

        return {
            validate: function () {
                var expected = Number(wrapper.dataset.captchaAnswer || NaN);
                var answer = Number(inputEl.value);
                var isValid = answer === expected;

                if (!isValid) {
                    inputEl.classList.add('valid-err');
                    if (errorEl) errorEl.style.display = 'block';
                } else {
                    inputEl.classList.remove('valid-err');
                    if (errorEl) errorEl.style.display = 'none';
                }
                return isValid;
            },
            reset: regenerate
        };
    }

    function getContactsValidStats(form, captcha) {
        var name = form.querySelector('[name="name"]');
        var phone = form.querySelector('[name="phone"]');
        var text = form.querySelector('[name="comment"]');
        var email = form.querySelector('[name="email"]');

        function isNameValid(el) {
            return el ? el.value.trim().length >= 5 : false;
        }
        function isPhoneValid(el) {
            return el ? el.value.trim().length >= 8 : false;
        }
        function isCommentValid(el) {
            return el ? el.value.trim().length >= 1 : true;
        }
        function isEmailValid(el) {
            return el ? /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(el.value.trim()) : true;
        }

        return {
            name: isNameValid(name),
            phone: isPhoneValid(phone),
            text: isCommentValid(text),
            email: isEmailValid(email),
            captcha: captcha.validate()
        };
    }

    function removeInputErrors(form) {
        var inputs = form.querySelectorAll('.valid-err');
        inputs.forEach(function (input) {
            input.classList.remove('valid-err');
        });
    }

    function markInvalidFields(form, stats) {
        var name = form.querySelector('[name="name"]');
        var phone = form.querySelector('[name="phone"]');
        var text = form.querySelector('[name="comment"]');
        var email = form.querySelector('[name="email"]');
        var captchaInput = form.querySelector('[data-captcha-input]');

        if (name && !stats.name) name.classList.add('valid-err');
        if (phone && !stats.phone) phone.classList.add('valid-err');
        if (text && !stats.text) text.classList.add('valid-err');
        if (email && !stats.email) email.classList.add('valid-err');
        if (captchaInput && !stats.captcha) captchaInput.classList.add('valid-err');
    }

    return {
        submitContacts: function () {
            $('.js-order-form').each(function () {
                var form = this;
                var captcha = setupCaptcha(form);

                $(form).on('submit', function (event) {
                    event.stopPropagation();
                    event.preventDefault();

                    var submitBtn = $('.submit, button[type="submit"]', form).first();
                    var data = new FormData(form);

                    data.delete('captcha_answer');
                    data.append('company', 'Naturallic');

                    var fieldsStats = getContactsValidStats(form, captcha);
                    var isFormValid = Object.values(fieldsStats).every(function (field) {
                        return field === true;
                    });

                    if (isFormValid) {
                        submitBtn.length ? submitBtn.val && submitBtn.val('Отправка...') : null;
                        $('input, textarea, button', form).attr('disabled', '');
                        removeInputErrors(form);

                        getUserCityCountryFromIp()
                            .then(function (location) {
                                data.append('city', location.city);
                                data.append('country', location.country);
                            })
                            .catch(function () {
                                data.append('city', '');
                                data.append('country', '');
                            })
                            .finally(function () {
                                $.ajax({
                                    url: form.getAttribute('action') || 'ajax.php',
                                    type: form.getAttribute('method') || 'POST',
                                    data: data,
                                    cache: false,
                                    dataType: 'json',
                                    processData: false,
                                    contentType: false,
                                    xhr: function () {
                                        var myXhr = $.ajaxSettings.xhr();
                                        if (myXhr.upload) {
                                            myXhr.upload.addEventListener(
                                                'progress',
                                                function (e) {
                                                    if (e.lengthComputable) {
                                                        var percentage = (e.loaded / e.total) * 100;
                                                        percentage = percentage.toFixed(0);
                                                        submitBtn.length ? submitBtn.html(percentage + '%') : null;
                                                    }
                                                },
                                                false
                                            );
                                        }
                                        return myXhr;
                                    },
                                    error: function () {
                                        $('input, textarea, button', form).removeAttr('disabled');
                                    },
                                    complete: function () {
                                        captcha.reset();
                                        $('.js-content-form').hide();
                                        $('.popup__title--main').hide();
                                        $('.js-success-form').show();
                                    }
                                });
                            });
                    } else {
                        removeInputErrors(form);
                        markInvalidFields(form, fieldsStats);
                    }
                    return false;
                });
            });
        },
        init: function () {
            Contacts.submitContacts();
        }
    };
})();

export default Contacts;

// const Contacts = (function () {
//     function getUserCityCountryFromIp() {
//         return fetch('https://api.ipify.org?format=json', {
//             headers: {Accept: 'application/json'}
//         })
//             .then(function (res) {
//                 if (!res.ok) throw new Error('Failed to fetch IP: ' + res.status);
//                 return res.json();
//             })
//             .then(function (ipData) {
//                 return fetch('https://ipapi.co/' + ipData.ip + '/json/', {
//                     headers: {Accept: 'application/json'}
//                 });
//             })
//             .then(function (geoRes) {
//                 if (!geoRes.ok) throw new Error('Failed to geolocate IP: ' + geoRes.status);
//                 return geoRes.json();
//             })
//             .then(function (geoData) {
//                 return {
//                     city: geoData.city || '',
//                     country: geoData.country_name || ''
//                 };
//             })
//             .catch(function () {
//                 return {city: '', country: ''};
//             });
//     }
//
//     function setupCaptcha(form) {
//         var wrapper = form.querySelector('[data-captcha-wrapper]');
//         var questionEl = wrapper ? wrapper.querySelector('[data-captcha-question]') : null;
//         var inputEl = wrapper ? wrapper.querySelector('[data-captcha-input]') : null;
//         var errorEl = wrapper ? wrapper.querySelector('[data-captcha-error]') : null;
//
//         if (!wrapper || !questionEl || !inputEl) {
//             return {
//                 validate: function () { return true; },
//                 reset: function () {}
//             };
//         }
//
//         function regenerate() {
//             var a = Math.floor(Math.random() * 10) + 1;
//             var b = Math.floor(Math.random() * 10) + 1;
//
//             wrapper.dataset.captchaAnswer = String(a + b);
//             questionEl.textContent = 'Скільки буде ' + a + ' + ' + b + '?';
//             inputEl.value = '';
//             inputEl.classList.remove('valid-err');
//             if (errorEl) errorEl.style.display = 'none';
//         }
//
//         regenerate();
//
//         return {
//             validate: function () {
//                 var expected = Number(wrapper.dataset.captchaAnswer || NaN);
//                 var answer = Number(inputEl.value);
//                 var isValid = answer === expected;
//
//                 if (!isValid) {
//                     inputEl.classList.add('valid-err');
//                     if (errorEl) errorEl.style.display = 'block';
//                 } else {
//                     inputEl.classList.remove('valid-err');
//                     if (errorEl) errorEl.style.display = 'none';
//                 }
//                 return isValid;
//             },
//             reset: regenerate
//         };
//     }
//
//     return {
//         submitContacts: function () {
//             const captcha = setupCaptcha();
//
//             $(".js-order-form").on("submit", function (event) {
//                 event.stopPropagation();
//                 event.preventDefault();
//
//                 let form = this,
//                     submit = $(".submit", form),
//                     data = new FormData();
//
//                 const name = document.querySelector('[name="name"]')
//                 const phone = document.querySelector('[name="phone"]')
//                 const text = document.querySelector('[name="comment"]')
//                 const email = document.querySelector('[name="email"]')
//
//
//                 data.append("name", $('[name="name"]', form).val());
//                 data.append("phone", $('[name="phone"]', form).val());
//                 text ? data.append("text", $('[name="comment"]', form).val()) : false
//                 email ? data.append("email", $('[name="email"]', form).val()) : false
//                 data.append("company", 'Naturallic');
//
//                 function getContactsValidStats() {
//                     function isNameValid(name) {
//                         return name.value.trim().length >= 5
//                     }
//
//                     function isPhoneValid(phone) {
//                         return phone.value.trim().length >= 8
//                     }
//
//                     function isCommentValid(text) {
//                         return text ? text.value.trim().length >= 1 : true
//                     }
//
//                     function isEmailValid(email) {
//                         return email ? /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email.value.trim()) : true
//                     }
//
//                     function isCaptchaValid() {
//                         return captcha.validate();
//                     }
//
//                     return {
//                         name: isNameValid(name),
//                         phone: isPhoneValid(phone),
//                         text: isCommentValid(text),
//                         email: isEmailValid(email),
//                         captcha: isCaptchaValid()
//                     }
//                 }
//
//                 function removeInputErrors() {
//                     name ? name.classList.remove('valid-err') : false
//                     phone ? phone.classList.remove('valid-err') : false
//                     text ? text.classList.remove('valid-err') : false
//                     email ? email.classList.remove('valid-err') : false
//                 }
//
//                 function sendContactsMessage() {
//                     $.ajax({
//                         url: "ajax.php",
//                         type: "POST",
//                         data: data,
//                         cache: false,
//                         dataType: "json",
//                         processData: false,
//                         contentType: false,
//                         xhr: function () {
//                             let myXhr = $.ajaxSettings.xhr();
//
//                             if (myXhr.upload) {
//                                 myXhr.upload.addEventListener(
//                                     "progress",
//                                     function (e) {
//                                         if (e.lengthComputable) {
//                                             let percentage = (e.loaded / e.total) * 100;
//                                             percentage = percentage.toFixed(0);
//                                             $(".submit", form).html(percentage + "%");
//                                         }
//                                     },
//                                     false
//                                 );
//                             }
//
//                             return myXhr;
//                         },
//                         error: function (jqXHR, textStatus) {
//                             $("input, textarea, button", form).removeAttr("disabled");
//                             // Тут выводим ошибку
//                         },
//                         complete: function () {
//                             // Тут можем что-то делать ПОСЛЕ успешной отправки формы
//                             $(".js-content-form").hide();
//                             $(".popup__title--main").hide();
//                             $(".js-success-form").show();
//                         },
//                     });
//                 }
//
//                 const fieldsStats = getContactsValidStats()
//                 const isFormValid = Object.values(fieldsStats).every(field => field === true)
//
//                 if (isFormValid) {
//                     $(".submit", form).val("Отправка...");
//                     $("input, textarea, button", form).attr("disabled", "");
//                     removeInputErrors()
//                     captcha.reset();
//                     // sendContactsMessage()
//                     getUserCityCountryFromIp()
//                         .then(function (location) {
//                             data.append('city', location.city);
//                             data.append('country', location.country);
//                         })
//                         .catch(function () {
//                             data.append('city', '');
//                             data.append('country', '');
//                         })
//                         .finally(sendContactsMessage);
//                 } else {
//                     removeInputErrors()
//                     name && !fieldsStats.name ? name.classList.add('valid-err') : false
//                     phone && !fieldsStats.phone ? phone.classList.add('valid-err') : false
//                     text && !fieldsStats.text ? text.classList.add('valid-err') : false
//                     email && !fieldsStats.email ? email.classList.add('valid-err') : false
//
//                     if (!fieldsStats.captcha) {
//                         document.querySelector('.captcha-input').classList.add('valid-err');
//                     }
//                 }
//                 return false;
//             });
//         },
//         init: function () {
//             Contacts.submitContacts()
//         },
//     };
// })();
//
// export default Contacts;
//
//
// // const Contacts = (function () {
// //   "use strict";
// //   const form = $(".js-order-form");
//
// //   return {
// //     submitForm: function () {
// //       form.submit(function (e) {
// //         e.preventDefault();
// //         $.ajax({
// //           url: "../submit.php",
// //           type: "POST",
// //           contentType: false,
// //           processData: false,
// //           data: new FormData(this),
// //           success: function success(data) {
// //             $(".js-content-form").hide();
// //             $(".popup__title--main").hide();
// //             $(".js-success-form").show();
//
// //             console.log("success");
// //           },
// //           error: function () {
// //             console.log("error");
// //           },
// //         });
// //       });
// //     },
// //     init: function () {
// //       Contacts.submitForm();
// //     },
// //   };
// // })();
//
// // export default Contacts;
