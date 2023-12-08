const Contacts = (function () {

    return {
        submitContacts: function () {
            $(".js-order-form").on("submit", function (event) {
                event.stopPropagation();
                event.preventDefault();

                let form = this,
                    submit = $(".submit", form),
                    data = new FormData();

                $(".submit", form).val("Отправка...");
                $("input, textarea", form).attr("disabled", "");

                data.append("name", $('[name="name"]', form).val());
                data.append("phone", $('[name="phone"]', form).val());
                data.append("company", 'Naturallic');
                console.log(data);

                $.ajax({
                    url: "ajax.php",
                    type: "POST",
                    data: data,
                    cache: false,
                    dataType: "json",
                    processData: false,
                    contentType: false,
                    xhr: function () {
                        let myXhr = $.ajaxSettings.xhr();

                        if (myXhr.upload) {
                            myXhr.upload.addEventListener(
                                "progress",
                                function (e) {
                                    if (e.lengthComputable) {
                                        let percentage = (e.loaded / e.total) * 100;
                                        percentage = percentage.toFixed(0);
                                        $(".submit", form).html(percentage + "%");
                                    }
                                },
                                false
                            );
                        }

                        return myXhr;
                    },
                    error: function (jqXHR, textStatus) {
                        // Тут выводим ошибку
                    },
                    complete: function () {
                        // Тут можем что-то делать ПОСЛЕ успешной отправки формы
                        $(".js-content-form").hide();
                        $(".popup__title--main").hide();
                        $(".js-success-form").show();
                    },
                });

                return false;
            });
        },
        init: function () {
            Contacts.submitContacts()
        },
    };
})();

export default Contacts;




// const Contacts = (function () {
//   "use strict";
//   const form = $(".js-order-form");

//   return {
//     submitForm: function () {
//       form.submit(function (e) {
//         e.preventDefault();
//         $.ajax({
//           url: "../submit.php",
//           type: "POST",
//           contentType: false,
//           processData: false,
//           data: new FormData(this),
//           success: function success(data) {
//             $(".js-content-form").hide();
//             $(".popup__title--main").hide();
//             $(".js-success-form").show();

//             console.log("success");
//           },
//           error: function () {
//             console.log("error");
//           },
//         });
//       });
//     },
//     init: function () {
//       Contacts.submitForm();
//     },
//   };
// })();

// export default Contacts;
