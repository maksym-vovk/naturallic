import noScroll from "../global/noScroll";

const TURNSTILE_WAIT_MS = 12000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TURNSTILE_LANG = { cz: "cs", ee: "et", gr: "el", be: "fr" };

function turnstileLanguage() {
    var lang = (document.documentElement.lang || "").toLowerCase();
    return TURNSTILE_LANG[lang] || lang;
}

const Contacts = (function () {
    "use strict";

    const widgets = new WeakMap();
    let turnstilePromise = null;

    function siteKey(form) {
        return (form.dataset.turnstileSiteKey || "").trim();
    }

    function whenTurnstileReady(src) {
        if (window.turnstile) return Promise.resolve();
        if (!src) return Promise.reject(new Error("turnstile-src"));
        if (turnstilePromise) return turnstilePromise;

        turnstilePromise = new Promise(function (resolve, reject) {
            const started = Date.now();

            if (!document.querySelector("script[data-turnstile-api]")) {
                const script = document.createElement("script");
                script.src = src;
                script.async = true;
                script.defer = true;
                script.setAttribute("data-turnstile-api", "");
                document.head.appendChild(script);
            }

            (function tick() {
                if (window.turnstile) {
                    resolve();
                    return;
                }
                if (Date.now() - started >= TURNSTILE_WAIT_MS) {
                    reject(new Error("turnstile-timeout"));
                    return;
                }
                window.setTimeout(tick, 100);
            })();
        });

        turnstilePromise.catch(function () {
            turnstilePromise = null;
        });

        return turnstilePromise;
    }

    function turnstileContainer(form) {
        return form.querySelector(".js-turnstile");
    }

    function resetTurnstile(form) {
        const container = turnstileContainer(form);
        if (!container || !window.turnstile || !widgets.has(container)) return;
        try {
            window.turnstile.reset(widgets.get(container));
        } catch (error) {}
    }

    function mountTurnstile(form) {
        const key = siteKey(form);
        const container = turnstileContainer(form);
        if (!key || !container) return Promise.resolve();

        if (widgets.has(container)) {
            resetTurnstile(form);
            return Promise.resolve();
        }

        if (container.dataset.pending === "true") return Promise.resolve();
        container.dataset.pending = "true";

        return whenTurnstileReady(form.dataset.turnstileSrc)
            .then(function () {
                if (widgets.has(container)) {
                    resetTurnstile(form);
                    return;
                }
                const widgetId = window.turnstile.render(container, {
                    sitekey: key,
                    theme: "light",
                    size: "flexible",
                    language: turnstileLanguage(),
                    callback: function () {
                        clearCaptchaError(form);
                    }
                });
                if (widgetId !== undefined && widgetId !== null) widgets.set(container, widgetId);
            })
            .catch(function () {})
            .then(function () {
                delete container.dataset.pending;
            });
    }

    function captchaToken(form) {
        const input = form.querySelector('input[name="cf-turnstile-response"]');
        if (input && input.value) return input.value;
        const container = turnstileContainer(form);
        if (!container || !window.turnstile || !widgets.has(container)) return "";
        try {
            return window.turnstile.getResponse(widgets.get(container)) || "";
        } catch (error) {
            return "";
        }
    }

    function messageFor(form, code) {
        if (code === "required") return form.dataset.errorRequired || "";
        if (code === "phone") return form.dataset.errorPhone || "";
        if (code === "email") return form.dataset.errorEmail || "";
        if (code === "captcha") return form.dataset.errorCaptcha || "";
        return form.dataset.errorForm || "";
    }

    function setFieldError(input, text) {
        const field = input.closest(".lead-field");
        if (!field) return;
        const error = field.querySelector(".lead-field__error");
        field.classList.add("is-invalid");
        input.setAttribute("aria-invalid", "true");
        if (error) {
            error.textContent = text;
            if (error.id) input.setAttribute("aria-describedby", error.id);
        }
    }

    function clearFieldError(input) {
        const field = input.closest(".lead-field");
        if (!field) return;
        field.classList.remove("is-invalid");
        input.removeAttribute("aria-invalid");
        input.removeAttribute("aria-describedby");
        const error = field.querySelector(".lead-field__error");
        if (error) error.textContent = "";
    }

    function setCaptchaError(form, text) {
        const block = form.querySelector("[data-captcha]");
        if (!block) return;
        block.classList.add("is-invalid");
        const error = block.querySelector(".lead-captcha__error");
        if (error) error.textContent = text;
    }

    function clearCaptchaError(form) {
        const block = form.querySelector("[data-captcha]");
        if (!block) return;
        block.classList.remove("is-invalid");
        const error = block.querySelector(".lead-captcha__error");
        if (error) error.textContent = "";
    }

    function setStatus(form, text) {
        const status = form.querySelector(".lead-form__status");
        if (!status) return;
        status.textContent = text || "";
        status.classList.toggle("is-visible", Boolean(text));
    }

    function clearStatus(form) {
        setStatus(form, "");
    }

    function clearErrors(form) {
        form.querySelectorAll(".lead-field.is-invalid input, .lead-field.is-invalid textarea").forEach(clearFieldError);
        clearCaptchaError(form);
        clearStatus(form);
    }

    function setSuccessView(form, on) {
        form.classList.toggle("is-success", on);
        const dialog = form.closest("dialog");
        if (dialog) dialog.classList.toggle("is-success", on);
    }

    function focusFirstField(form) {
        const field = form.querySelector('[name="name"]');
        if (field) field.focus();
    }

    function shouldLock(el) {
        if (el.type === "hidden") return false;
        if (el.name === "website" || el.name === "cf-turnstile-response") return false;
        if (el.closest(".lead-honeypot") || el.closest(".js-success-form")) return false;
        if (el.getAttribute("aria-hidden") === "true") return false;
        return el.offsetParent !== null;
    }

    function lockForm(form) {
        const submitBtn = form.querySelector('[type="submit"]');
        const locked = [];
        form.querySelectorAll("input, textarea, select, button").forEach(function (el) {
            if (!shouldLock(el)) return;
            el.disabled = true;
            locked.push(el);
        });
        form._lockedControls = locked;
        form.classList.add("is-submitting");
        form.setAttribute("aria-busy", "true");
        if (submitBtn) {
            if (!submitBtn.dataset.label) submitBtn.dataset.label = submitBtn.textContent.trim();
            submitBtn.textContent = form.dataset.submitting || submitBtn.dataset.label;
        }
    }

    function unlockForm(form) {
        (form._lockedControls || []).forEach(function (el) {
            el.disabled = false;
        });
        form._lockedControls = [];
        form.classList.remove("is-submitting");
        form.removeAttribute("aria-busy");
        const submitBtn = form.querySelector('[type="submit"]');
        if (submitBtn && submitBtn.dataset.label) submitBtn.textContent = submitBtn.dataset.label;
    }

    function validate(form) {
        const variant = form.dataset.leadVariant;
        const name = form.querySelector('[name="name"]');
        const phone = form.querySelector('[name="phone"]');
        const email = form.querySelector('[name="email"]');
        const message = form.querySelector('[name="message"]');
        let firstInvalid = null;
        let valid = true;

        clearErrors(form);

        function fail(input, code) {
            valid = false;
            if (input) setFieldError(input, messageFor(form, code));
            if (!firstInvalid && input) firstInvalid = input;
        }

        if (name && !name.value.trim()) fail(name, "required");

        if (phone) {
            const digits = phone.value.replace(/\D/g, "");
            if (!digits) fail(phone, "required");
            else if (digits.length < 9 || digits.length > 15) fail(phone, "phone");
        }

        if (variant === "contacts" && email) {
            const value = email.value.trim();
            if (!value) fail(email, "required");
            else if (!EMAIL_PATTERN.test(value)) fail(email, "email");
        }

        if (variant === "contacts" && message && !message.value.trim()) fail(message, "required");

        if (siteKey(form) && !captchaToken(form)) {
            valid = false;
            setCaptchaError(form, messageFor(form, "captcha"));
        }

        if (!valid) {
            setStatus(form, messageFor(form, "form"));
            if (firstInvalid) firstInvalid.focus();
            else {
                const captcha = form.querySelector(".lead-captcha.is-invalid .js-turnstile");
                if (captcha) {
                    captcha.setAttribute("tabindex", "-1");
                    captcha.focus();
                }
            }
        }

        return valid;
    }

    function payloadFrom(form, token) {
        const email = form.querySelector('[name="email"]');
        const website = form.querySelector('[name="website"]');
        return {
            name: (form.querySelector('[name="name"]') || { value: "" }).value.trim(),
            email: email ? email.value.trim() : "",
            phone: (form.querySelector('[name="phone"]') || { value: "" }).value.replace(/\D/g, ""),
            message: (form.querySelector('[name="message"]') || { value: "" }).value.trim(),
            country: form.dataset.country || "",
            source: form.dataset.source || "",
            website: website ? website.value : "",
            captchaToken: token || ""
        };
    }

    function isAccepted(responseOk, body) {
        if (!responseOk) return false;
        if (!body) return true;
        return body.ok === true;
    }

    function onSuccess(form) {
        const dialog = form.closest("dialog");
        form.reset();
        clearErrors(form);
        if (dialog && !dialog.open) {
            setSuccessView(form, false);
            return;
        }
        setSuccessView(form, true);
    }

    function onError(form) {
        const dialog = form.closest("dialog");
        if (dialog && !dialog.open) return;
        setStatus(form, form.dataset.errorForm || "");
    }

    function bindForm(form) {
        form.addEventListener("input", function (event) {
            const el = event.target;
            if (!el || !el.name) return;
            if (el.name === "phone") {
                const digits = el.value.replace(/\D+/g, "");
                if (el.value !== digits) {
                    el.value = digits;
                    if (typeof el.setSelectionRange === "function") {
                        const pos = digits.length;
                        el.setSelectionRange(pos, pos);
                    }
                }
            }
            if (el.name === "website") return;
            clearFieldError(el);
            clearStatus(form);
        });

        form.addEventListener("submit", function (event) {
            event.preventDefault();
            if (form.getAttribute("data-lead-pending") === "true") return;
            if (!validate(form)) return;

            const token = siteKey(form) ? captchaToken(form) : "";
            const payload = payloadFrom(form, token);
            form.setAttribute("data-lead-pending", "true");
            lockForm(form);

            let succeeded = false;
            fetch(form.dataset.apiEndpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify(payload)
            })
                .then(function (response) {
                    return response.json().then(
                        function (body) {
                            return { ok: response.ok, body: body };
                        },
                        function () {
                            return { ok: response.ok, body: null };
                        }
                    );
                })
                .then(function (result) {
                    succeeded = isAccepted(result.ok, result.body);
                })
                .catch(function () {
                    succeeded = false;
                })
                .then(function () {
                    unlockForm(form);
                    form.removeAttribute("data-lead-pending");
                    resetTurnstile(form);
                    if (succeeded) onSuccess(form);
                    else onError(form);
                });
        });
    }

    function closeMenus() {
        document.querySelectorAll(".menu-mobile").forEach(function (el) {
            el.classList.remove("menu-mobile--active");
        });
        document.querySelectorAll(".js-burger").forEach(function (el) {
            el.classList.remove("burger--active");
        });
        document.querySelectorAll(".js-overlay").forEach(function (el) {
            el.classList.remove("active");
        });
    }

    function restoreDialog(dialog) {
            noScroll.off();
            document.querySelectorAll(".js-show-popup").forEach(function (el) {
                el.classList.remove("active");
            });
            const form = dialog.querySelector(".js-lead-form");
            if (form) setSuccessView(form, false);
        }

        function closeDialog(dialog) {
            restoreDialog(dialog);
            if (dialog.open) dialog.close();
        }

        function bindDialog(dialog) {
        const form = dialog.querySelector(".js-lead-form");

        dialog.addEventListener("close", function () {
            restoreDialog(dialog);
        });

        dialog.addEventListener("cancel", function (event) {
            event.preventDefault();
            closeDialog(dialog);
        });

        dialog.addEventListener("click", function (event) {
            if (event.target === dialog) closeDialog(dialog);
        });

        dialog.querySelectorAll(".js-close, .js-lead-close").forEach(function (el) {
            el.addEventListener("click", function (event) {
                event.preventDefault();
                event.stopPropagation();
                closeDialog(dialog);
            });
        });

        document.querySelectorAll(".js-show-popup").forEach(function (button) {
            button.addEventListener("click", function (event) {
                const selector = button.getAttribute("data-target");
                const target = selector ? document.querySelector(selector) : null;
                if (target !== dialog) return;
                event.preventDefault();
                if (dialog.open || typeof dialog.showModal !== "function") return;
                closeMenus();
                button.classList.add("active");
                dialog.showModal();
                noScroll.on();
                if (!form) return;
                focusFirstField(form);
                mountTurnstile(form).then(function () {
                    if (!dialog.open) return;
                    const active = document.activeElement;
                    if (active && active.closest && active.closest(".js-turnstile")) focusFirstField(form);
                });
            });
        });
    }

    return {
        init: function () {
            const forms = document.querySelectorAll(".js-lead-form");
            forms.forEach(function (form) {
                bindForm(form);
                if (!form.closest("dialog")) mountTurnstile(form);
            });
            const dialog = document.querySelector("dialog.js-popup");
            if (dialog) bindDialog(dialog);
        }
    };
})();

export default Contacts;
