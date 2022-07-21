const Sliders = (function () {
  const headerSlider = $(".js-slider-header");
  const productsSlider = $(".js-slider-products");
  const reviewsSliderWrap = $(".js-slider-reviews-wrap");
  return {
    updatePagination: function (c, m) {
      var current = c,
        last = m,
        delta = 2,
        left = current - delta,
        right = current + delta + 1,
        range = [],
        rangeWithDots = [],
        l;

      for (let i = 1; i <= last; i++) {
        if (i == 1 || i == last || (i >= left && i < right)) {
          range.push(i);
        }
      }

      for (let i of range) {
        if (l) {
          if (i - l === 2) {
            rangeWithDots.push(l + 1);
          } else if (i - l !== 1) {
            rangeWithDots.push("...");
          }
        }
        rangeWithDots.push(i);
        l = i;
      }
      return rangeWithDots;
    },
    changeSliderDots: function (paginationArray) {
      const dotsArray = reviewsSlider.find(".slick-dots li a");
      for (let i = 0; i < dotsArray.length; i++) {
        const dot = $(dotsArray[i]);
        const li = dot.parents("li");
        li.removeClass("hide");
        const indexDot = dot.data("slide-index");
        if (paginationArray.indexOf(indexDot) === -1) {
          li.addClass("hide");
        }
      }
    },
    initReviewsSlider: function () {
      reviewsSliderWrap.each(function (index) {
        var _this = $(this);
        _this.addClass("swiper-slider-review-" + index);
        // var dragSize = _this.data("drag-size") ? _this.data("drag-size") : 50;

        const setActualReviewHeight = (isOneVisibleSlide) => {
          const reviewBlocks = document.querySelectorAll('.swiper-slider-review-' + index + ' .js-review')
          if (!isOneVisibleSlide) {
            const maxHeight = Math.max(...[...reviewBlocks].map(review => review.offsetHeight))
            reviewBlocks.forEach(review => review.style.minHeight = maxHeight + 'px')
          } else {
            reviewBlocks.forEach(review => review.style.minHeight = 'auto')
          }
        }
        const winWidth = window.innerWidth;
        winWidth <= 639 ? setActualReviewHeight(true) : setActualReviewHeight(false)

        window.addEventListener('resize', () => {
          const winWidth = window.innerWidth;
          winWidth <= 639 ? setActualReviewHeight(true) : setActualReviewHeight(false)
        })

        var swiper = new Swiper(".swiper-slider-review-" + index, {
          direction: "horizontal",
          slidesPerView: 1,
          autoHeight: true,
          scrollbar: {
            el: ".js-slider-reviews-scrollbar",
            draggable: true,
            dragSize: 22,
          },
          breakpoints: {
            480: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          },
        });
      });
    },

    initHeaderSlider: function () {
      headerSlider.on("init", function (event, slick, direction) {
        headerSlider.addClass("init");
      });
      new Swiper('.js-slider-header', {
        direction: "horizontal",
        slidesPerView: 1,
        autoplay: true,
        effect: "fade",

        scrollbar: {
          el: '.js-slider-header-scrollbar',
          draggable: true,
          dragSize: 22
        },
      });
    },
    initProductSlider: function () {
      $(".js-slider-product-for").not(".slick-initialized").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: ".js-slider-product-nav",
      });
      $(".js-slider-product-nav").not(".slick-initialized").slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: ".js-slider-product-for",
        dots: false,
        focusOnSelect: true,
      });
    },
    initProductsSlider: function () {
      const prodSlider = new Swiper('.js-slider-products', {
        direction: "horizontal",
        slidesPerView: 1,

        scrollbar: {
          el: '.js-slider-hits-scrollbar',
          draggable: true,
          dragSize: 22
        },

        breakpoints: {
          480: {
            slidesPerView: 2
          },
          640: {
            slidesPerView: 2
          },
          768: {
            slidesPerView: 2
          },
          1024: {
            slidesPerView: 3
          }
        }
      });

      window.addEventListener('resize', function() {
        const winWidth = window.innerWidth
        winWidth <= 479 ? prodSlider.destroy() : false
      })
    },
    destroyProductsSlider: function () {
      productsSlider.filter(".slick-initialized").slick("unslick");
    },
    init: function () {
      Sliders.initHeaderSlider();
      Sliders.initReviewsSlider();
    },
  };
})();

export default Sliders;
