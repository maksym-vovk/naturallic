import noScroll from "../global/noScroll";

const Controls = (function () {
    "use strict";
    const btnAccordeon = $(".js-btn-accordeon");
    const contentAccordeon = $(".js-info-accordeon");

    const tabs = $(".js-tab");
    const spanProductsAll = $(".js-product-all");
    const spanProductsShow = $(".js-product-show");
    const productsList = $(".js-list-prod");
    const countCatalog = $(".js-catalog-count");
    const product = $(".js-product");
    const btnCatalog = $(".js-btn-catalog");

    const reviews = $(".js-review");
    const spanReviewsAll = $(".js-reviews-all");
    const spanReviewsShow = $(".js-reviews-show");
    const btnReviews = $(".js-btn-reviews");

    const DEFAULT_LANG = 'cz';

    function hideBtn(countProductsShow, countProductsAll) {
        if (countProductsShow == countProductsAll) {
            btnCatalog.hide();
        } else {
            btnCatalog.show();
        }
    }

    function getParameterByName(name, url = window.location.href) {
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return "";
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    function showListProduct(idActiveBlock) {
        const activeList = $(`.js-list-prod[data-target="${idActiveBlock}"]`);
        productsList.removeClass("active");
        activeList.addClass("active");
    }

    // --- НОВАЯ ВСПОМОГАТЕЛЬНАЯ ФУНКЦИЯ ---
    // Обновляет флаг в хедере без перезагрузки страницы
    function updateHeaderFlag(lang) {
        const flagImages = document.querySelectorAll(
            ".lang-select__flag--current"
        );
        flagImages.forEach((img) => {
            img.setAttribute("src", `../img/language-${lang}.png`);
            img.setAttribute("alt", lang);
        });
    }

    return {
        openFaqContent: function () {
            btnAccordeon.on("click", function (e) {
                e.preventDefault();
                const _this = $(this);
                const parent = _this.parents(".js-accordeon");
                if (!_this.hasClass("active")) {
                    parent.find(contentAccordeon).slideUp(700);
                    parent.find(btnAccordeon).removeClass("active");
                }
                _this.toggleClass("active");
                _this.next(contentAccordeon).slideToggle();
            });
        },
        highlightingActiveTab: function () {
            var paramdId = getParameterByName("id");
            if (paramdId) {
                const target = $(`#${paramdId}`);
                tabs.removeClass("active");
                target.addClass("active");
                showListProduct(paramdId);
            }
        },
        showListProducts: function () {
            tabs.click(function (e) {
                e.preventDefault();
                const _this = $(this);
                const idActiveBlock = _this.prop("id");
                tabs.removeClass("active");
                _this.addClass("active");
                showListProduct(idActiveBlock);
                Controls.calculateProducts();
            });
        },
        showCatalog: function () {
            btnCatalog.click(function (e) {
                e.preventDefault();
                const _this = $(this);
                const parent = _this.parent(productsList);
                const hiddenProducts = $('.js-product.hidden');
                hiddenProducts.removeClass('hidden').addClass('active');
                Controls.calculateProducts();
                _this.hide();
            });
        },
        calculateProducts: function () {
            const parent = countCatalog.parent(".js-list-prod.active");
            const countProductsAll = parent.find(product).length;
            const countProductsShow = parent.find('.js-product.active').length;

            hideBtn(countProductsShow, countProductsAll);

            const hideCatalog = parent.find(".js-catalog-hide");
            if (hideCatalog.hasClass("show")) {
                parent.find(spanProductsShow).html(countProductsAll);
                parent.find(btnCatalog).hide();
            } else {
                parent.find(spanProductsShow).html(countProductsShow);
                parent.find(spanProductsAll).html(countProductsAll);
            }
        },
        calculateReviews: function () {
            if ($(".js-reviews-show-list").hasClass("show")) {
                spanReviewsShow.html(reviews.length);
                btnCatalog.hide();
            } else {
                spanReviewsAll.html(reviews.length);
            }
        },
        showReviews: function () {
            btnReviews.click(function (e) {
                e.preventDefault();
                const _this = $(this);
                $(".js-reviews-show-list").addClass("show");
                Controls.calculateReviews();
                _this.hide();
            });
        },
        setLanguage: function () {
            const langModal = document.querySelector(".language");
            const languageSelect = document.querySelector(".select");
            const languagesArr = [
                ...languageSelect.querySelectorAll(".select__option"),
            ].map((option) => option.dataset.lang);
            const defaultSelectOption = document.querySelector('.select__option--default');
            const pathNameParams = window.location.pathname.split('/').filter(Boolean);
            const currentLang = pathNameParams.length && pathNameParams[0].length === 2
                ? pathNameParams[0]
                : null;
            const isLangInURL = languagesArr.includes(currentLang);
            const savedLanguage = localStorage.getItem("localization");
            const isSavedDefault = localStorage.getItem("localization") === DEFAULT_LANG;

            if (savedLanguage && !isSavedDefault && !isLangInURL) {
                location.href = `${window.location.origin}/${savedLanguage}${window.location.pathname}${window.location.search}`;
            }

            defaultSelectOption.addEventListener('click', event => {
                event.preventDefault();

                langModal.classList.add("language--hidden");
                localStorage.setItem("localization", DEFAULT_LANG);

                // --- ИСПРАВЛЕНИЕ: обновляем флаг сразу после выбора языка ---
                updateHeaderFlag(DEFAULT_LANG);

                noScroll.off();
            });

            // Обработчики для НЕ-дефолтных опций в модалке
            // (те, что вызывают редирект через setLanguage логику)
            languageSelect.querySelectorAll(".select__option:not(.select__option--default)")
                .forEach((option) => {
                    option.addEventListener('click', () => {
                        const selectedLang = option.dataset.lang;
                        localStorage.setItem("localization", selectedLang);

                        // --- ИСПРАВЛЕНИЕ: обновляем флаг до редиректа ---
                        updateHeaderFlag(selectedLang);
                    });
                });

            langModal.addEventListener("click", (event) => {
                if (savedLanguage) {
                    event.target.classList.contains("language")
                        ? langModal.classList.add("language--hidden")
                        : false;
                }
            });

            window.addEventListener("load", function () {
                if (!isLangInURL && !isSavedDefault) {
                    langModal.classList.remove("language--hidden");
                }

                if (isLangInURL) {
                    localStorage.setItem("localization", currentLang);
                }

                if (!langModal.classList.contains('language--hidden')) {
                    noScroll.on();
                }
            });
        },
        showHeaderLang: function () {
            const langSelect = document.querySelectorAll(".lang-select");
            const currentLangBlock = document.querySelectorAll(".lang-select__current");
            const langOptions = document.querySelectorAll(".lang-select__option");
            const langOptionDefault = document.querySelector('.lang-select__option--default');
            const languageSelect = document.querySelector(".select");
            const currentLang = window.location.pathname.substring(1, 3);
            const languagesArr = [
                ...languageSelect.querySelectorAll(".select__option"),
            ].map((option) => option.dataset.lang);
            const savedLanguage = localStorage.getItem("localization");
            const isSavedDefault = localStorage.getItem("localization") === DEFAULT_LANG;

            langOptionDefault.addEventListener('click', event => {
                localStorage.setItem("localization", DEFAULT_LANG);
                langOptionDefault.classList.add('lang-select__option--active');

                // --- ИСПРАВЛЕНИЕ: обновляем флаг при клике в хедере ---
                updateHeaderFlag(DEFAULT_LANG);
            });

            langOptions.forEach((option) => {
                option.addEventListener('click', () => {
                    const selectedLang = option.dataset.lang;
                    localStorage.setItem("localization", selectedLang);

                    // --- ИСПРАВЛЕНИЕ: обновляем флаг при смене языка из хедера ---
                    updateHeaderFlag(selectedLang);
                });

                option.dataset.lang === currentLang
                    ? option.classList.add("lang-select__option--active")
                    : false;

                option.dataset.lang === DEFAULT_LANG && isSavedDefault
                    ? option.classList.add("lang-select__option--active")
                    : false;

                option.dataset.lang === DEFAULT_LANG && !savedLanguage
                    ? option.classList.add("lang-select__option--active")
                    : false;
            });

            const createCurrentFlagElement = (innerElement) => {
                const flagImage = document.createElement("img");
                flagImage.className = "lang-select__flag lang-select__flag--current";
                flagImage.setAttribute("src", `../img/language-${savedLanguage || DEFAULT_LANG}.png`);
                flagImage.setAttribute("alt", savedLanguage || DEFAULT_LANG);
                flagImage.setAttribute('width', '20');
                flagImage.setAttribute('height', '14');
                innerElement.append(flagImage);
            };

            currentLangBlock.forEach((block) => createCurrentFlagElement(block));

            document.addEventListener("click", (event) => {
                const { target } = event;
                if (target.closest(".lang-select")) {
                    langSelect.forEach((select) =>
                        select.classList.toggle("lang-select--active")
                    );
                } else {
                    langSelect.forEach((select) =>
                        select.classList.remove("lang-select--active")
                    );
                }
            });

            const setCorrectURL = () => {
                const search = window.location.search;
                const pathArr = window.location.pathname.split('/');
                const currentPage = pathArr[pathArr.length - 1];
                const isOrderPage = currentPage === 'order.html';
                const isSuccessPage = currentPage === 'success.html';

                search
                    ? localStorage.setItem('searchParams', search)
                    : false;

                !isOrderPage && !isSuccessPage
                    ? localStorage.removeItem('searchParams')
                    : false;

                const savedSearchParams = localStorage.getItem('searchParams');

                if (savedSearchParams && !search) {
                    window.location.href = window.location.href + savedSearchParams;
                }
            };
            setCorrectURL();
        },
        setProductCardHeight: function () {
            const categoryTabs = document.querySelectorAll(".js-tab");
            const catalogMoreBtn = document.querySelectorAll(".js-btn-catalog");

            let productCards = document.querySelectorAll(".product");

            const setProductHeight = () => {
                let productCards = document.querySelectorAll(".product");
                const productDetails = document.querySelectorAll(".product__btn");

                if (productCards.length && productDetails.length) {
                    const productDetailsBtnHeight = [...productDetails].filter(btn => {
                        return btn.clientHeight > 0;
                    })[0].clientHeight + 15;
                    const cardsHeightArray = [...productCards].map(card => card.clientHeight);
                    const maxCardHeight = Math.max(...cardsHeightArray);

                    productCards.forEach((card, index) => {
                        const newCardHeight = `${maxCardHeight - productDetailsBtnHeight}px`;
                        card.style.height = newCardHeight;

                        card.addEventListener("mouseover", ({ target }) => {
                            handleCardMouseOver(target, cardsHeightArray, index);
                        }, false);

                        card.addEventListener("mouseout", ({ target }) => {
                            handleCardMouseOut(target, newCardHeight);
                        }, false);
                    });
                }
            };

            const setNameAndDescHeight = () => {
                const winWidth = window.innerWidth;
                const prodNames = document.querySelectorAll('.product__name');
                const prodTexts = document.querySelectorAll('.product__desc');

                if (winWidth > 639) {
                    prodNames.forEach(name => name.style.minHeight = 'auto');
                    prodTexts.forEach(text => text.style.minHeight = "auto");

                    const prodNamesHeight = [...prodNames].map(name => name.clientHeight);
                    const prodTextsHeight = [...prodTexts].map(text => text.clientHeight);

                    const maxNameHeight = Math.max(...prodNamesHeight);
                    const maxTextHeight = Math.max(...prodTextsHeight);

                    prodNames.forEach(name => name.style.minHeight = maxNameHeight + 'px');
                    prodTexts.forEach(text => text.style.minHeight = maxTextHeight + 'px');
                } else {
                    prodTexts.forEach(text => text.style.minHeight = "auto");
                    prodNames.forEach(name => name.style.minHeight = 'auto');
                }
            };

            const updateProductCards = () =>
                (productCards = document.querySelectorAll(".product"));

            const handleCardMouseOver = (target, cardsHeightArray, index) => {
                const initialCardHeight = cardsHeightArray[index]
                    ? cardsHeightArray[index]
                    : Math.max(...cardsHeightArray);
                const card = target.closest(".product");
                card.style.height = `${initialCardHeight}px`;
                card.classList.add("product--hovered");
            };

            const handleCardMouseOut = (target, newCardHeight) => {
                const card = target.closest(".product");
                card.style.height = newCardHeight;
                card.classList.remove("product--hovered");
            };

            const resetCardsHeight = () => {
                const prodTexts = document.querySelectorAll('.product__desc');
                productCards.forEach(card => card.style.height = "auto");
                prodTexts.forEach(text => text.style.minHeight = "auto");
            };

            let isCalculate = false;

            document.addEventListener("DOMContentLoaded", () => {
                resetCardsHeight();
                const winWidth = window.innerWidth;
                setNameAndDescHeight();
                if (winWidth > 479) setProductHeight();
                isCalculate = !isCalculate;
            });

            window.addEventListener("resize", () => {
                resetCardsHeight();
                const winWidth = window.innerWidth;
                setNameAndDescHeight();
                if (winWidth > 479) setProductHeight();
            });

            catalogMoreBtn.forEach((btn) => {
                btn.addEventListener("click", () => {
                    resetCardsHeight();
                    updateProductCards();
                    setNameAndDescHeight();
                    setProductHeight();
                });
            });

            categoryTabs.forEach((tab) => {
                tab.addEventListener("click", () => {
                    resetCardsHeight();
                    updateProductCards();
                    setNameAndDescHeight();
                    setProductHeight();
                });
            });

            if (!isCalculate) {
                const winWidth = window.innerWidth;
                resetCardsHeight();
                setNameAndDescHeight();
                if (winWidth > 479) setProductHeight();
            }
        },
        setLoader: function () {
            const loader = document.querySelector(".loader");

            window.addEventListener("load", function () {
                setTimeout(function () {
                    loader.classList.add("loader--hidden");
                }, 500);
            });

            setTimeout(function () {
                loader.classList.add("loader--hidden");
            }, 2500);
        },
        webpChecker: function () {
            const WebP = new Image();
            WebP.src =
                "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
            WebP.onload = WebP.onerror = function () {
                const isWebp = WebP.height === 2;
                if (!isWebp) {
                    document.querySelector("body").classList.remove("webp");
                } else {
                    document.querySelector("body").classList.add("webp");
                }
            };
        },
        init: function () {
            Controls.openFaqContent();
            Controls.highlightingActiveTab();
            Controls.showListProducts();
            Controls.showCatalog();
            Controls.calculateProducts();
            Controls.calculateReviews();
            Controls.showReviews();
            Controls.setProductCardHeight();
            Controls.setLanguage();
            Controls.showHeaderLang();
            Controls.webpChecker();
            Controls.setLoader();
        },
    };
})();

export default Controls;
