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
        const hideCatalog = parent.find(".js-catalog-hide");
        hideCatalog.addClass("show");
        Controls.calculateProducts();
        _this.hide();
      });
    },
    calculateProducts: function () {
      //родитель блока
      const parent = countCatalog.parent(".js-list-prod.active");
      //количество всех товаров
      const countProductsAll = parent.find(product).length;
      //количество показаных товаров
      const countProductsShow = parent
        .find(".js-catalog-show")
        .find(product).length;

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
      //Общее количество отзывов
      // spanReviewsShow.html(reviews.length);

      //Показано отзывов
      // const countReviewsShow = $(".js-reviews-show-list").find(reviews).length;
      if ($(".js-reviews-show-list").hasClass("show")) {
        spanReviewsShow.html(reviews.length);
        btnCatalog.hide();
      } else {
        // spanReviewsShow.html(countReviewsShow);
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
      const langModal = document.querySelector('.language')
      const languageSelect = document.querySelector('.select')
      const languagesArr = [...languageSelect.querySelectorAll('.select__option')].map(option => option.dataset.lang)

      const currentLang = window.location.pathname.substring(1, 3)
      const isLangInURL = languagesArr.includes(currentLang)
      const savedLanguage = localStorage.getItem('localization')

      if (savedLanguage && !isLangInURL) {
        location.href = `${window.location.origin}/${savedLanguage}${window.location.pathname}${window.location.search}`
      }

      langModal.addEventListener('click', (event) => {
        if(savedLanguage) {
          event.target.classList.contains('language')
              ? langModal.classList.add('language--hidden')
              : false
        }
      })

      window.addEventListener('load', function () {
        if (!isLangInURL) {
          langModal.classList.remove('language--hidden')
        } else {
          localStorage.setItem('localization', currentLang)
        }
      })
    },
    showHeaderLang: function () {
      const langSelect = document.querySelectorAll('.lang-select')
      const currentLangBlock = document.querySelectorAll('.lang-select__current')
      const langOptions = document.querySelectorAll('.lang-select__option')
      const languageSelect = document.querySelector('.select')
      const currentLang = window.location.pathname.substring(1, 3)
      const languagesArr = [...languageSelect.querySelectorAll('.select__option')].map(option => option.dataset.lang)

      langOptions.forEach(option => option.dataset.lang === currentLang ? option.classList.add('lang-select__option--active') : false)

      const createCurrentFlagElement = (innerElement) => {
        if (languagesArr.includes(currentLang)) {
          const flagImage = document.createElement('img')
          flagImage.className = 'lang-select__flag lang-select__flag--current'
          flagImage.setAttribute('src', `../img/language-${currentLang}.png`)
          flagImage.setAttribute('alt', currentLang)
          innerElement.append(flagImage)
        } else {
          const langText = document.createElement('span')
          langText.className = 'lang-select__alt'
          langText.textContent = 'Lang'
          innerElement.append(langText)
        }
      }

      currentLangBlock.forEach(block => createCurrentFlagElement(block))

      document.addEventListener('click', (event) => {
        const {target} = event
        if (target.closest('.lang-select')) {
          langSelect.forEach(select => select.classList.toggle('lang-select--active'))
        } else {
          langSelect.forEach(select => select.classList.remove('lang-select--active'))
        }
      })
    },
    setProductCardHeight: function () {
      const categoryTabs = document.querySelectorAll('.js-tab')
      const catalogMoreBtn = document.querySelectorAll('.js-btn-catalog')

      let productCards = document.querySelectorAll('.product')

      const setProductHeight = () => {
        const productDetailsBtnHeight = document.querySelector('.product__btn').clientHeight + 15
        const cardsHeightArray = [...productCards].map(card => card.clientHeight)
        const maxCardHeight = Math.max(...cardsHeightArray)

        productCards.forEach((card, index) => {
          const newCardHeight = `${maxCardHeight - productDetailsBtnHeight}px`
          card.style.height = newCardHeight

          card.addEventListener('mouseover', ({target}) => {
            handleCardMouseOver(target, cardsHeightArray, index)
          }, false)

          card.addEventListener('mouseout', ({target}) => {
            handleCardMouseOut(target, newCardHeight)
          }, false)
        })
      }

      const updateProductCards = () => productCards = document.querySelectorAll('.product')

      const handleCardMouseOver = (target, cardsHeightArray, index) => {
        const initialCardHeight = cardsHeightArray[index]
        const card = target.closest(".product")
        card.style.height = `${initialCardHeight}px`
        card.classList.add('product--hovered')
      }

      const handleCardMouseOut = (target, newCardHeight) => {
        const card = target.closest(".product")
        card.style.height = newCardHeight
        card.classList.remove('product--hovered')
      }

      const resetCardsHeight = () => productCards.forEach(card => card.style.height = "auto")

      window.addEventListener('load', () => {
        resetCardsHeight()
        const winWidth = window.innerWidth
        if (winWidth > 479) {
          setProductHeight()
        }
      })

      window.addEventListener('resize', () => {
        resetCardsHeight()
        const winWidth = window.innerWidth
        if (winWidth > 479) {
          setProductHeight()
        }
      })

      catalogMoreBtn.forEach(btn => {
        btn.addEventListener('click', () => {
          resetCardsHeight()
          updateProductCards()
          setProductHeight()
        })
      })

      categoryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
          resetCardsHeight()
          updateProductCards()
          setProductHeight()
        })
      })
    },
    setLoader: function () {
      const hideLoader = () => document.querySelector('.loader').classList.add('loader--hidden')
      window.addEventListener('load', () => {
        setTimeout(() => hideLoader(), 500)
      })
    },
    webpChecker: function () {
        const WebP = new Image();
        WebP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
        WebP.onload = WebP.onerror = function() {
          const isWebp = (WebP.height === 2);
          if (!isWebp) {
            document.querySelector('body').classList.remove('webp');
          } else {
            document.querySelector('body').classList.add('webp');
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
      Controls.setLanguage();
      Controls.showHeaderLang();
      Controls.setProductCardHeight();
      Controls.webpChecker();
      Controls.setLoader()
    },
  };
})();

export default Controls;
