!function(e){var t={};function n(r){if(t[r])return t[r].exports;var i=t[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(r,i,function(t){return e[t]}.bind(null,i));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=2)}([function(e,t,n){!function(t){"use strict";var n,r,i=!1;function o(e){if("undefined"!=typeof document&&!i){var t=document.documentElement;r=window.pageYOffset,document.documentElement.scrollHeight>window.innerHeight?t.style.width="calc(100% - "+function(){if(void 0!==n)return n;var e=document.documentElement,t=document.createElement("div");return t.setAttribute("style","width:99px;height:99px;position:absolute;top:-9999px;overflow:scroll;"),e.appendChild(t),n=t.offsetWidth-t.clientWidth,e.removeChild(t),n}()+"px)":t.style.width="100%",t.style.position="fixed",t.style.top=-r+"px",t.style.overflow="hidden",i=!0}}function a(){if("undefined"!=typeof document&&i){var e=document.documentElement;e.style.width="",e.style.position="",e.style.top="",e.style.overflow="",window.scroll(0,r),i=!1}}var c={on:o,off:a,toggle:function(){i?a():o()}};void 0!==e.exports?e.exports=c:t.noScroll=c}(window)},function(e,t,n){"use strict";
/*! npm.im/object-fit-images 3.2.4 */var r="bfred-it:object-fit-images",i=/(object-fit|object-position)\s*:\s*([-.\w\s%]+)/g,o="undefined"==typeof Image?{style:{"object-position":1}}:new Image,a="object-fit"in o.style,c="object-position"in o.style,s="background-size"in o.style,l="string"==typeof o.currentSrc,u=o.getAttribute,d=o.setAttribute,f=!1;function p(e,t,n){var r="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='"+(t||1)+"' height='"+(n||0)+"'%3E%3C/svg%3E";u.call(e,"src")!==r&&d.call(e,"src",r)}function g(e,t){e.naturalWidth?t(e):setTimeout(g,100,e,t)}function m(e){var t=function(e){for(var t,n=getComputedStyle(e).fontFamily,r={};null!==(t=i.exec(n));)r[t[1]]=t[2];return r}(e),n=e[r];if(t["object-fit"]=t["object-fit"]||"fill",!n.img){if("fill"===t["object-fit"])return;if(!n.skipTest&&a&&!t["object-position"])return}if(!n.img){n.img=new Image(e.width,e.height),n.img.srcset=u.call(e,"data-ofi-srcset")||e.srcset,n.img.src=u.call(e,"data-ofi-src")||e.src,d.call(e,"data-ofi-src",e.src),e.srcset&&d.call(e,"data-ofi-srcset",e.srcset),p(e,e.naturalWidth||e.width,e.naturalHeight||e.height),e.srcset&&(e.srcset="");try{!function(e){var t={get:function(t){return e[r].img[t||"src"]},set:function(t,n){return e[r].img[n||"src"]=t,d.call(e,"data-ofi-"+n,t),m(e),t}};Object.defineProperty(e,"src",t),Object.defineProperty(e,"currentSrc",{get:function(){return t.get("currentSrc")}}),Object.defineProperty(e,"srcset",{get:function(){return t.get("srcset")},set:function(e){return t.set(e,"srcset")}})}(e)}catch(e){window.console&&console.warn("https://bit.ly/ofi-old-browser")}}!function(e){if(e.srcset&&!l&&window.picturefill){var t=window.picturefill._;e[t.ns]&&e[t.ns].evaled||t.fillImg(e,{reselect:!0}),e[t.ns].curSrc||(e[t.ns].supported=!1,t.fillImg(e,{reselect:!0})),e.currentSrc=e[t.ns].curSrc||e.src}}(n.img),e.style.backgroundImage='url("'+(n.img.currentSrc||n.img.src).replace(/"/g,'\\"')+'")',e.style.backgroundPosition=t["object-position"]||"center",e.style.backgroundRepeat="no-repeat",e.style.backgroundOrigin="content-box",/scale-down/.test(t["object-fit"])?g(n.img,(function(){n.img.naturalWidth>e.width||n.img.naturalHeight>e.height?e.style.backgroundSize="contain":e.style.backgroundSize="auto"})):e.style.backgroundSize=t["object-fit"].replace("none","auto").replace("fill","100% 100%"),g(n.img,(function(t){p(e,t.naturalWidth,t.naturalHeight)}))}function v(e,t){var n=!f&&!e;if(t=t||{},e=e||"img",c&&!t.skipTest||!s)return!1;"img"===e?e=document.getElementsByTagName("img"):"string"==typeof e?e=document.querySelectorAll(e):"length"in e||(e=[e]);for(var i=0;i<e.length;i++)e[i][r]=e[i][r]||{skipTest:t.skipTest},m(e[i]);n&&(document.body.addEventListener("load",(function(e){"IMG"===e.target.tagName&&v(e.target,{skipTest:t.skipTest})}),!0),f=!0,e="img"),t.watchMQ&&window.addEventListener("resize",v.bind(null,e,{skipTest:t.skipTest}))}v.supportsObjectFit=a,v.supportsObjectPosition=c,function(){function e(e,t){return e[r]&&e[r].img&&("src"===t||"srcset"===t)?e[r].img:e}c||(HTMLImageElement.prototype.getAttribute=function(t){return u.call(e(this,t),t)},HTMLImageElement.prototype.setAttribute=function(t,n){return d.call(e(this,t),t,String(n))})}(),e.exports=v},function(e,t,n){e.exports=n(3)},function(e,t,n){"use strict";n.r(t);var r=n(1),i=n.n(r);function o(e){return function(e){if(Array.isArray(e))return a(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return a(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return a(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function a(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var c,s,l,u=(c=$(".js-slider-header"),s=$(".js-slider-products"),l=$(".js-slider-reviews-wrap"),{updatePagination:function(e,t){for(var n,r=t,i=e-2,o=e+2+1,a=[],c=[],s=1;s<=r;s++)(1==s||s==r||s>=i&&s<o)&&a.push(s);for(var l=0,u=a;l<u.length;l++){var d=u[l];n&&(d-n==2?c.push(n+1):d-n!=1&&c.push("...")),c.push(d),n=d}return c},changeSliderDots:function(e){for(var t=reviewsSlider.find(".slick-dots li a"),n=0;n<t.length;n++){var r=$(t[n]),i=r.parents("li");i.removeClass("hide");var o=r.data("slide-index");-1===e.indexOf(o)&&i.addClass("hide")}},initReviewsSlider:function(){l.each((function(e){$(this).addClass("swiper-slider-review-"+e);var t=function(t){var n=document.querySelectorAll(".swiper-slider-review-"+e+" .js-review");if(t)n.forEach((function(e){return e.style.minHeight="auto"}));else{var r=Math.max.apply(Math,o(o(n).map((function(e){return e.offsetHeight}))));n.forEach((function(e){return e.style.minHeight=r+"px"}))}},n=window.innerWidth;t(n<=639),window.addEventListener("resize",(function(){var e=window.innerWidth;t(e<=639)})),new Swiper(".swiper-slider-review-"+e,{direction:"horizontal",slidesPerView:1,autoHeight:!0,scrollbar:{el:".js-slider-reviews-scrollbar",draggable:!0,dragSize:22},breakpoints:{480:{slidesPerView:1},640:{slidesPerView:2},768:{slidesPerView:2},1024:{slidesPerView:3}}})}))},initHeaderSlider:function(){c.on("init",(function(e,t,n){c.addClass("init")})),new Swiper(".js-slider-header",{direction:"horizontal",slidesPerView:1,autoplay:!0,effect:"fade",scrollbar:{el:".js-slider-header-scrollbar",draggable:!0,dragSize:22}})},initProductSlider:function(){$(".js-slider-product-for").not(".slick-initialized").slick({slidesToShow:1,slidesToScroll:1,arrows:!1,fade:!0,asNavFor:".js-slider-product-nav"}),$(".js-slider-product-nav").not(".slick-initialized").slick({slidesToShow:3,slidesToScroll:1,asNavFor:".js-slider-product-for",dots:!1,focusOnSelect:!0})},initProductsSlider:function(){var e=new Swiper(".js-slider-products",{direction:"horizontal",slidesPerView:1,scrollbar:{el:".js-slider-hits-scrollbar",draggable:!0,dragSize:22},breakpoints:{480:{slidesPerView:2},640:{slidesPerView:2},768:{slidesPerView:2},1024:{slidesPerView:3}}});window.addEventListener("resize",(function(){window.innerWidth<=479&&e.destroy()}))},destroyProductsSlider:function(){s.filter(".slick-initialized").slick("unslick")},init:function(){u.initHeaderSlider(),u.initReviewsSlider()}}),d=u;function f(e){return function(e){if(Array.isArray(e))return p(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return p(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return p(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function p(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var g,m,v,h,w,b=function(){var e=$(".js-btn-accordeon"),t=$(".js-info-accordeon"),n=$(".js-tab"),r=$(".js-product-all"),i=$(".js-product-show"),o=$(".js-list-prod"),a=$(".js-catalog-count"),c=$(".js-product"),s=$(".js-btn-catalog"),l=$(".js-review"),u=$(".js-reviews-all"),d=$(".js-reviews-show"),p=$(".js-btn-reviews");function g(e){var t=$('.js-list-prod[data-target="'.concat(e,'"]'));o.removeClass("active"),t.addClass("active")}return{openFaqContent:function(){e.on("click",(function(n){n.preventDefault();var r=$(this),i=r.parents(".js-accordeon");r.hasClass("active")||(i.find(t).slideUp(700),i.find(e).removeClass("active")),r.toggleClass("active"),r.next(t).slideToggle()}))},highlightingActiveTab:function(){var e=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:window.location.href;e=e.replace(/[\[\]]/g,"\\$&");var n=new RegExp("[?&]"+e+"(=([^&#]*)|&|#|$)"),r=n.exec(t);return r?r[2]?decodeURIComponent(r[2].replace(/\+/g," ")):"":null}("id");if(e){var t=$("#".concat(e));n.removeClass("active"),t.addClass("active"),g(e)}},showListProducts:function(){n.click((function(e){e.preventDefault();var t=$(this),r=t.prop("id");n.removeClass("active"),t.addClass("active"),g(r),b.calculateProducts()}))},showCatalog:function(){s.click((function(e){e.preventDefault();var t=$(this);t.parent(o).find(".js-catalog-hide").addClass("show"),b.calculateProducts(),t.hide()}))},calculateProducts:function(){var e=a.parent(".js-list-prod.active"),t=e.find(c).length,n=e.find(".js-catalog-show").find(c).length;!function(e,t){e==t?s.hide():s.show()}(n,t),e.find(".js-catalog-hide").hasClass("show")?(e.find(i).html(t),e.find(s).hide()):(e.find(i).html(n),e.find(r).html(t))},calculateReviews:function(){$(".js-reviews-show-list").hasClass("show")?(d.html(l.length),s.hide()):u.html(l.length)},showReviews:function(){p.click((function(e){e.preventDefault();var t=$(this);$(".js-reviews-show-list").addClass("show"),b.calculateReviews(),t.hide()}))},setLanguage:function(){var e=document.querySelector(".language"),t=f(document.querySelector(".select").querySelectorAll(".select__option")).map((function(e){return e.dataset.lang})),n=window.location.pathname.substring(1,3),r=t.includes(n),i=localStorage.getItem("localization");i&&!r&&(location.href="".concat(window.location.origin,"/").concat(i).concat(window.location.pathname).concat(window.location.search)),e.addEventListener("click",(function(t){t.target.classList.contains("language")&&e.classList.add("language--hidden")})),window.addEventListener("load",(function(){r?localStorage.setItem("localization",n):e.classList.remove("language--hidden")}))},showHeaderLang:function(){var e=document.querySelectorAll(".lang-select"),t=document.querySelectorAll(".lang-select__current"),n=document.querySelectorAll(".lang-select__option"),r=window.location.pathname.substring(1,3);n.forEach((function(e){return e.dataset.lang===r&&e.classList.add("lang-select__option--hidden")}));t.forEach((function(e){return t=e,(n=document.createElement("img")).className="lang-select__flag lang-select__flag--current",n.setAttribute("src","../img/language-".concat(r,".png")),n.setAttribute("alt",r),void t.append(n);var t,n})),document.addEventListener("click",(function(t){t.target.closest(".lang-select")?e.forEach((function(e){return e.classList.toggle("lang-select--active")})):e.forEach((function(e){return e.classList.remove("lang-select--active")}))}))},init:function(){b.openFaqContent(),b.highlightingActiveTab(),b.showListProducts(),b.showCatalog(),b.calculateProducts(),b.calculateReviews(),b.showReviews(),b.setLanguage(),b.showHeaderLang()}}}(),y=b,j=n(0),S=n.n(j),P=(g=$(".js-popup"),m=$(".js-show-popup"),v=$(".js-show-frame-popup"),h=$(".js-frame-popup"),w=$(".js-overlay"),{addFramePopup:function(){if($(".js-show-frame-popup")){var e=$(".js-show-frame-popup").attr("data-src"),t=document.createElement("iframe");t.setAttribute("src",e),t.classList.add("frame-popup__iframe"),$(".frame-popup__content").append(t)}},initFramePopup:function(){v.click((function(e){h.toggleClass("active"),w.addClass("active"),h.removeClass("menu-mobile--active"),$(".js-burger").removeClass("burger--active"),S.a.on()}))},closeFramePopup:function(){$(".js-frame-close").click((function(e){h.removeClass("active"),w.removeClass("active"),S.a.off()}))},initPopUp:function(){m.click((function(e){e.preventDefault();var t=$(this),n=$(t.data("target"));t.toggleClass("active"),n.toggleClass("active"),w.addClass("active"),$(".menu-mobile").removeClass("menu-mobile--active"),$(".js-burger").removeClass("burger--active"),S.a.on()}))},closePopup:function(){$(".js-close").click((function(e){e.preventDefault(),g.removeClass("active"),m.removeClass("active"),w.removeClass("active"),S.a.off()}))},init:function(){P.addFramePopup(),P.initPopUp(),P.closePopup(),P.initFramePopup(),P.closeFramePopup()}}),C=P,k=$(document),O=$(window),I=function(){var e=$(".js-burger"),t=$(".js-scroll"),n=$(".js-overlay"),r=$(".js-fixed-menu"),i=r.height();function o(e){var t=e.offset().top;$("html, body").animate({scrollTop:t-15},800)}return{showFixedMenu:function(){k.scroll((function(){var e=k.scrollTop(),t="none",n="none";e<i?((e/i).toFixed(2),r.removeClass("menu--fixed")):(1,t="0px 0px 20px rgba(52, 49, 89, 0.1)",n="white",r.addClass("menu--fixed")),r.css({boxShadow:t,background:n})}))},showMobileMenu:function(){e.click((function(t){t.preventDefault(),$($(this).data("target")).toggleClass("menu-mobile--active"),e.toggleClass("burger--active"),n.toggleClass("active"),S.a.toggle()}))},scrollToTarget:function(){t.click((function(t){t.preventDefault(),S.a.off();var r=$(this),i=r.attr("href"),a=$(i);r.data("target")&&o($(r.data("target")));a.length&&o(a),$(".menu-mobile").removeClass("menu-mobile--active"),e.removeClass("burger--active"),n.removeClass("active")}))},init:function(){I.showMobileMenu(),I.showFixedMenu()}}}(),x=I;function A(e){return function(e){if(Array.isArray(e))return e}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return T(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return T(e,t)}(e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function T(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var E=function(){var e=$(".js-product-residue"),t=$('input[name="chatbot_history"]');var n=[],r=1;function i(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:window.location.href;e=e.replace(/[\[\]]/g,"\\$&");var n=new RegExp("[?&]"+e+"(=([^&#]*)|&|#|$)"),r=n.exec(t);return r?r[2]?decodeURIComponent(r[2].replace(/\+/g," ")):"":null}return{submitForm:function(){$("#order-form").submit((function(e){e.preventDefault();var o=A($(this).find(":input:not(:hidden)").serializeArray().map((function(e){return t={},n=e.name,r=e.value,n in t?Object.defineProperty(t,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[n]=r,t;var t,n,r}))).slice(0),a={countProduct:r};n=n.concat(a).concat(o),t.val(JSON.stringify(n));var c=i("id");location.href="".concat(location.origin,"/success.html?id=").concat(c)}))},createOrderForm:function(){var e=i("id");e&&($(".js-product-name").html(e),$(".js-product-photo").attr("src","../img/".concat(e,".png")),$("input[name='redirect_url']").val("success.html?id=".concat(e)))},choiceCountProduct:function(){$(".js-counter-arrow-inc").click((function(e){e.preventDefault(),(r+=1)>20&&(r=20),$(".js-counter-number").html(r)})),$(".js-counter-arrow-dec").click((function(e){e.preventDefault(),(r-=1)<=1&&(r=1),$(".js-counter-number").html(r)}))},createSuccessPage:function(){var e=i("id");$(".js-success-product-name").html(e),$(".js-success-product-photo").attr("src","../img/".concat(e,".png"))},showResiudePack:function(){var t=60;setInterval((function(){var n=function(e,t){var n=e+Math.random()*(t+1-e);return Math.floor(n)}(1,6);(t-=n)<=12||e.html(t)}),12e3)},init:function(){E.createOrderForm(),E.choiceCountProduct(),E.createSuccessPage(),E.showResiudePack(),E.submitForm()}}}(),_=E;function z(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function H(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?z(Object(n),!0).forEach((function(t){D(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):z(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function D(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var L=function(){var e={WIN_WIDTH:0},t={afterResize:!1,onInit:!1};function n(){return{WIN_WIDTH:O.width()}}function r(){var r,i,o,a;O.resize((r=function(){e=n(),t.afterResize&&t.afterResize(e)},i=100,function(){var e=this,t=arguments,n=function(){a=null,o||r.apply(e,t)},c=o&&!a;clearTimeout(a),a=setTimeout(n,i),c&&r.apply(e,t)}))}return{layoutHandler:function(i){i&&(t=H(H({},t),i)),e=n(),t.onInit&&t.onInit(e),r()}}}();$((function(){for(var e=(new Date).getFullYear(),t=document.getElementsByClassName("year"),n=0;n<t.length;n++){t[n].innerHTML=e}d.init(),y.init(),C.init(),x.init(),_.init(),i()(),L.layoutHandler({onInit:function(e){d.initProductSlider(),e.WIN_WIDTH>=480?d.initProductsSlider():e.WIN_WIDTH<=479&&d.destroyProductsSlider()},afterResize:function(e){d.initProductSlider(),e.WIN_WIDTH>=480?d.initProductsSlider():e.WIN_WIDTH<=479&&d.destroyProductsSlider()}})}))}]);