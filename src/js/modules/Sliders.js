const Sliders = (function () {
  const headerSlider = $(".js-slider-header");
  const productsSlider = $(".js-slider-products");
  const reviewsSlider = $(".js-slider-reviews");
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
      reviewsSlider.on("init", function (event, slick) {
        if (slick.slideCount < 7) {
          return;
        }
        const paginationArray = Sliders.updatePagination(0, slick.slideCount);

        Sliders.changeSliderDots(paginationArray);
      });

      reviewsSlider.slick({
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        infinite: false,
        customPaging: function (slick, index) {
          return `<a data-slide-index=${index + 1}>${index + 1}</a>`;
        },
      });

      reviewsSlider.on(
        "beforeChange",
        function (event, slick, currentSlide, nextSlide) {
          const paginationArray = Sliders.updatePagination(
            nextSlide,
            slick.slideCount
          );
          Sliders.changeSliderDots(paginationArray);
        }
      );
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
          dragSize: 'auto'
        },
      });
      // headerSlider.slick({
      //   dots: true,
      //   infinite: true,
      //   speed: 500,
      //   fade: true,
      //   cssEase: "linear",
      //   arrows: false,
      //   autoplay: true,
      //   autoplaySpeed: 5000,
      //   initialSlide: 0,
      //   responsive: [
      //     {
      //       breakpoint: 480,
      //       settings: {
      //         adaptiveHeight: true,
      //       },
      //     },
      //   ],
      // });
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
        // centerMode: true,
        focusOnSelect: true,
      });
    },
    initProductsSlider: function () {
      productsSlider.not(".slick-initialized").slick({
        slidesToShow: 4,
        slidesToScroll: 4,
        variableWidth: true,
        dots: false,
        prevArrow:
          '<button class="prev"><i class="fico fico-arrowSlider"></i></button>',
        nextArrow:
          '<button class="next"><i class="fico fico-arrowSlider"></i></button>',
        responsive: [
          {
            breakpoint: 1441,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
            },
          },
          {
            breakpoint: 1250,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
            },
          },
        ],
      });
    },
    destroyProductsSlider: function () {
      productsSlider.filter(".slick-initialized").slick("unslick");
    },
    init: function () {
      Sliders.initHeaderSlider();
      // Sliders.initProductSlider();
      Sliders.initReviewsSlider();
    },
  };
})();

export default Sliders;
