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
                e.preventDefault();

                $(`input[name='count']`).val(count);

                const dataForm = $(this).find("input.js-data").serializeArray();
                const [...object] = dataForm.map(function (item) {
                    return {
                        answer: item.value,
                        question: item.name,
                    };
                });
                data.push(...object);
                console.log(data);

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

                const formSendScript = document.createElement('script')
                formSendScript.textContent = formData.formSendScript

                if (orderForm) {
                    orderForm.setAttribute('action', String(formData.formAction))
                    const orderBody = orderForm ? document.querySelector('body') : false
                    orderBody.appendChild(formSendScript)
                }

                // $('#order-form').attr('action', formData.formAction)


                $(".js-product-name").html(prodNameWithSpaces);
                $(".js-product-photo").attr("src", `../img/${productName}.png`);

                $(`input[name='campaign_id']`).val(productData.campaign_id);
                $(`input[name='landing_id']`).val(productData.landing_id);
                $(`input[name='redirect_url']`).val(`success.html?id=${productName}`);
                $(`input[name='product']`).val(`${productData.productName}`);
                $(`input[name='niche']`).val(productData.niche);
                $(`input[name='lang']`).val(currentLangLower);
            }
            $(`input[name='country_code']`).val(currentLangLower)
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