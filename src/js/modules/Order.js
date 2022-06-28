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
                const dataForm = $(this).find(":input:not(:hidden)").serializeArray();

                const [...object] = dataForm.map(function (item) {
                    return { [item.name]: item.value };
                });
                const countObject = {
                    countProduct: count,
                };
                const oldArray = data;
                data = oldArray.concat(countObject).concat(object);
                updValueChatbotHistory();
            });
        },
        showOrderProduct: function () {
            var paramdId = getParameterByName("id");

            const object = {
                product: paramdId,
            };
            data.push(object);

            if (paramdId) {
                $(".js-product-name").html(paramdId);
                $(".js-product-photo").attr("src", `img/${paramdId}.png`);
                $(".js-product-name-form").val(paramdId);
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
            const paramProduct = getParameterByName("product");
            $(".js-success-product-name").html(paramProduct);
            $(".js-success-product-photo").attr("src", `img/${paramProduct}.png`);
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
            Order.showOrderProduct();
            Order.choiceCountProduct();
            Order.createSuccessPage();
            Order.submitForm();
            Order.showResiudePack();
        },
    };
})();

export default Order;