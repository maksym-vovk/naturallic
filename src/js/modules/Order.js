import {productsInfo} from "../data/productInfo";
import {formSetting} from "../data/orderFormSettings";

const Order = (function () {
    "use strict";
    const productResidue = $(".js-product-residue");
    const inputChatbotHistory = $(`input[name="chatbot_history"]`);

    function updValueChatbotHistory() {
        inputChatbotHistory.val(JSON.stringify(data));
    }

    let data = [];
    let count = 1;

    function getParameterByName(name, url = window.location.href) {
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return "";
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    function randomInteger(min, max) {
        var rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand);
    }

    return {
        submitForm: function () {
            $("#order-form").submit(function (e) {
                // e.preventDefault();

                $(`input[name='count']`).val(count);

                const dataForm = $(this).find("input.js-data").serializeArray();
                const [...object] = dataForm.map(function (item) {
                    return {
                        answer: item.value,
                        question: item.name,
                    };
                });
                data.push(...object);

                updValueChatbotHistory();
            });
        },
        createOrderForm: function () {
            const productName = getParameterByName("id");
            const productNameUnderscore = String(productName).split('-').join('_')
            const prodNameWithSpaces = String(productName).split('-').join(' ')
            const currentLangLower = localStorage.getItem('localization').toLowerCase()

            if (productName) {
                const orderForm = document.querySelector('#order-form')

                const productData = productsInfo[currentLangLower][productNameUnderscore]
                const formData = formSetting[productData.company]

                if (orderForm) {
                    const body = document.querySelector('body')
                    const script = document.createElement('script')
                    const scriptFirst = document.createElement('script')

                    const startScript = `
                        window.lang = '${currentLangLower}';
                        window.country_code = '${currentLangLower.toUpperCase()}';
                        window.is_downloaded_from_dashboard = true;
                        window._locations = [{"offer_id":"1016","country_code":"CZ","price_current":0.01,"display_priority":2,"id":3077311,"name":"Czech Republic","type":"country","country_id":3077311,"region_name":null,"currency":"czk","country_name":"Czech Republic","price_previous":1,"price_delivery":0,"price_total":0.01},{"offer_id":"1016","country_code":"RO","price_current":0.01,"display_priority":4,"id":798549,"name":"Romania","type":"country","country_id":798549,"region_name":null,"currency":"ron","country_name":"Romania","price_previous":1,"price_delivery":0,"price_total":0.01},{"offer_id":"1016","country_code":"HU","price_current":0.01,"display_priority":3,"id":719819,"name":"Hungary","type":"country","country_id":719819,"region_name":null,"currency":"Ft","country_name":"Hungary","price_previous":20600,"price_delivery":0,"price_total":0.01},{"offer_id":"1016","country_code":"IT","price_current":0.01,"display_priority":1,"id":3175395,"name":"Italy","type":"country","country_id":3175395,"region_name":null,"currency":"€","country_name":"Italy","price_previous":78,"price_delivery":0,"price_total":0.01},{"offer_id":"1016","country_code":"CL","price_current":0.01,"display_priority":0,"id":3895114,"name":"Chile","type":"country","country_id":3895114,"region_name":null,"currency":"clp","country_name":"Chile","price_previous":1,"price_delivery":0,"price_total":0.01}];
                        window.additional_phone_in_downloaded = false;
                        window.is_namephone_validated = true;
                        window.back_button_enabled = true;
                    `

                    orderForm.setAttribute('action', String(formData.formAction))
                    // scriptFirst.textContent = startScript
                    // script.textContent = formData.formSendScript
                    // body.appendChild(scriptFirst)
                    // body.appendChild(script)
                }

                $(".js-product-name").html(prodNameWithSpaces);
                $(".js-product-photo").attr("src", `../img/${productName}.png`);

                $(`input[name='campaign_id']`).val(productData.campaign_id);
                $(`input[name='redirect_url']`).val(`success.html?id=${productName}`);

                $(`input[name='product']`).val(`${productData.productName}`);
                $(`input[name='niche']`).val(productData.niche);
                $(`input[name='country']`).val(productData.country);
                $(`input[name='lang']`).val(currentLangLower);
                // $(`input[name='country_code']`).val(`${currentLangLower.toUpperCase()}`)
            }
        },
        choiceCountProduct: function () {
            $(".js-counter-arrow-inc").click(function (e) {
                e.preventDefault();
                count += 1;
                if (count > 20) {
                    count = 20;
                }
                $(".js-counter-number").html(count);
            });
            $(".js-counter-arrow-dec").click(function (e) {
                e.preventDefault();
                count -= 1;
                if (count <= 1) {
                    count = 1;
                }
                $(".js-counter-number").html(count);
            });
        },
        createSuccessPage: function () {
            const paramProduct = getParameterByName("id");
            $(".js-success-product-name").html(paramProduct);
            $(".js-success-product-photo").attr("src", `../img/${paramProduct}.png`);
        },
        showResiudePack: function () {
            let max = 60;
            let min = 12;
            setInterval(() => {
                let difference = randomInteger(1, 6);
                max = max - difference;
                if (max <= min) {
                    return;
                }
                productResidue.html(max);
            }, 12000);
        },
        init: function () {
            Order.createOrderForm();
            Order.choiceCountProduct();
            Order.createSuccessPage();
            Order.showResiudePack();
            Order.submitForm();
        },
    };
})();

export default Order;