!function(e){var t={};function r(n){if(t[n])return t[n].exports;var i=t[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,r),i.l=!0,i.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)r.d(n,i,function(t){return e[t]}.bind(null,i));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=2)}([function(e,t,r){!function(t){"use strict";var r,n,i=!1;function o(e){if("undefined"!=typeof document&&!i){var t=document.documentElement;n=window.pageYOffset,document.documentElement.scrollHeight>window.innerHeight?t.style.width="calc(100% - "+function(){if(void 0!==r)return r;var e=document.documentElement,t=document.createElement("div");return t.setAttribute("style","width:99px;height:99px;position:absolute;top:-9999px;overflow:scroll;"),e.appendChild(t),r=t.offsetWidth-t.clientWidth,e.removeChild(t),r}()+"px)":t.style.width="100%",t.style.position="fixed",t.style.top=-n+"px",t.style.overflow="hidden",i=!0}}function a(){if("undefined"!=typeof document&&i){var e=document.documentElement;e.style.width="",e.style.position="",e.style.top="",e.style.overflow="",window.scroll(0,n),i=!1}}var s={on:o,off:a,toggle:function(){i?a():o()}};void 0!==e.exports?e.exports=s:t.noScroll=s}(window)},function(e,t,r){"use strict";
/*! npm.im/object-fit-images 3.2.4 */var n="bfred-it:object-fit-images",i=/(object-fit|object-position)\s*:\s*([-.\w\s%]+)/g,o="undefined"==typeof Image?{style:{"object-position":1}}:new Image,a="object-fit"in o.style,s="object-position"in o.style,c="background-size"in o.style,l="string"==typeof o.currentSrc,u=o.getAttribute,d=o.setAttribute,f=!1;function p(e,t,r){var n="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='"+(t||1)+"' height='"+(r||0)+"'%3E%3C/svg%3E";u.call(e,"src")!==n&&d.call(e,"src",n)}function g(e,t){e.naturalWidth?t(e):setTimeout(g,100,e,t)}function m(e){var t=function(e){for(var t,r=getComputedStyle(e).fontFamily,n={};null!==(t=i.exec(r));)n[t[1]]=t[2];return n}(e),r=e[n];if(t["object-fit"]=t["object-fit"]||"fill",!r.img){if("fill"===t["object-fit"])return;if(!r.skipTest&&a&&!t["object-position"])return}if(!r.img){r.img=new Image(e.width,e.height),r.img.srcset=u.call(e,"data-ofi-srcset")||e.srcset,r.img.src=u.call(e,"data-ofi-src")||e.src,d.call(e,"data-ofi-src",e.src),e.srcset&&d.call(e,"data-ofi-srcset",e.srcset),p(e,e.naturalWidth||e.width,e.naturalHeight||e.height),e.srcset&&(e.srcset="");try{!function(e){var t={get:function(t){return e[n].img[t||"src"]},set:function(t,r){return e[n].img[r||"src"]=t,d.call(e,"data-ofi-"+r,t),m(e),t}};Object.defineProperty(e,"src",t),Object.defineProperty(e,"currentSrc",{get:function(){return t.get("currentSrc")}}),Object.defineProperty(e,"srcset",{get:function(){return t.get("srcset")},set:function(e){return t.set(e,"srcset")}})}(e)}catch(e){window.console&&console.warn("https://bit.ly/ofi-old-browser")}}!function(e){if(e.srcset&&!l&&window.picturefill){var t=window.picturefill._;e[t.ns]&&e[t.ns].evaled||t.fillImg(e,{reselect:!0}),e[t.ns].curSrc||(e[t.ns].supported=!1,t.fillImg(e,{reselect:!0})),e.currentSrc=e[t.ns].curSrc||e.src}}(r.img),e.style.backgroundImage='url("'+(r.img.currentSrc||r.img.src).replace(/"/g,'\\"')+'")',e.style.backgroundPosition=t["object-position"]||"center",e.style.backgroundRepeat="no-repeat",e.style.backgroundOrigin="content-box",/scale-down/.test(t["object-fit"])?g(r.img,(function(){r.img.naturalWidth>e.width||r.img.naturalHeight>e.height?e.style.backgroundSize="contain":e.style.backgroundSize="auto"})):e.style.backgroundSize=t["object-fit"].replace("none","auto").replace("fill","100% 100%"),g(r.img,(function(t){p(e,t.naturalWidth,t.naturalHeight)}))}function v(e,t){var r=!f&&!e;if(t=t||{},e=e||"img",s&&!t.skipTest||!c)return!1;"img"===e?e=document.getElementsByTagName("img"):"string"==typeof e?e=document.querySelectorAll(e):"length"in e||(e=[e]);for(var i=0;i<e.length;i++)e[i][n]=e[i][n]||{skipTest:t.skipTest},m(e[i]);r&&(document.body.addEventListener("load",(function(e){"IMG"===e.target.tagName&&v(e.target,{skipTest:t.skipTest})}),!0),f=!0,e="img"),t.watchMQ&&window.addEventListener("resize",v.bind(null,e,{skipTest:t.skipTest}))}v.supportsObjectFit=a,v.supportsObjectPosition=s,function(){function e(e,t){return e[n]&&e[n].img&&("src"===t||"srcset"===t)?e[n].img:e}s||(HTMLImageElement.prototype.getAttribute=function(t){return u.call(e(this,t),t)},HTMLImageElement.prototype.setAttribute=function(t,r){return d.call(e(this,t),t,String(r))})}(),e.exports=v},function(e,t,r){e.exports=r(3)},function(e,t,r){"use strict";r.r(t);var n=r(1),i=r.n(n);function o(e){return function(e){if(Array.isArray(e))return a(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return a(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return a(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function a(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var s,c,l,u=(s=$(".js-slider-header"),c=$(".js-slider-products"),l=$(".js-slider-reviews-wrap"),{updatePagination:function(e,t){for(var r,n=t,i=e-2,o=e+2+1,a=[],s=[],c=1;c<=n;c++)(1==c||c==n||c>=i&&c<o)&&a.push(c);for(var l=0,u=a;l<u.length;l++){var d=u[l];r&&(d-r==2?s.push(r+1):d-r!=1&&s.push("...")),s.push(d),r=d}return s},changeSliderDots:function(e){for(var t=reviewsSlider.find(".slick-dots li a"),r=0;r<t.length;r++){var n=$(t[r]),i=n.parents("li");i.removeClass("hide");var o=n.data("slide-index");-1===e.indexOf(o)&&i.addClass("hide")}},initReviewsSlider:function(){l.each((function(e){var t=$(this);t.addClass("swiper-slider-review-"+e);var r=t.data("drag-size")?t.data("drag-size"):50,n=function(t){var r=document.querySelectorAll(".swiper-slider-review-"+e+" .js-review");if(t)r.forEach((function(e){return e.style.minHeight="auto"}));else{var n=Math.max.apply(Math,o(o(r).map((function(e){return e.offsetHeight}))));r.forEach((function(e){return e.style.minHeight=n+"px"}))}},i=window.innerWidth;n(i<=639),window.addEventListener("resize",(function(){var e=window.innerWidth;n(e<=639)})),new Swiper(".swiper-slider-review-"+e,{direction:"horizontal",slidesPerView:1,autoHeight:!0,scrollbar:{el:".js-slider-reviews-scrollbar",draggable:!0,dragSize:r},breakpoints:{480:{slidesPerView:1},640:{slidesPerView:2},768:{slidesPerView:2},1024:{slidesPerView:3}}})}))},initHeaderSlider:function(){s.on("init",(function(e,t,r){s.addClass("init")})),new Swiper(".js-slider-header",{direction:"horizontal",slidesPerView:1,autoplay:!0,effect:"fade",scrollbar:{el:".js-slider-header-scrollbar",draggable:!0,dragSize:"auto"}})},initProductSlider:function(){$(".js-slider-product-for").not(".slick-initialized").slick({slidesToShow:1,slidesToScroll:1,arrows:!1,fade:!0,asNavFor:".js-slider-product-nav"}),$(".js-slider-product-nav").not(".slick-initialized").slick({slidesToShow:3,slidesToScroll:1,asNavFor:".js-slider-product-for",dots:!1,focusOnSelect:!0})},initProductsSlider:function(){var e=new Swiper(".js-slider-products",{direction:"horizontal",slidesPerView:1,scrollbar:{el:".js-slider-hits-scrollbar",draggable:!0,dragSize:"auto"},breakpoints:{480:{slidesPerView:2},640:{slidesPerView:2},768:{slidesPerView:2},1024:{slidesPerView:3}}});window.addEventListener("resize",(function(){window.innerWidth<=479&&e.destroy()}))},destroyProductsSlider:function(){c.filter(".slick-initialized").slick("unslick")},init:function(){u.initHeaderSlider(),u.initReviewsSlider()}}),d=u;function f(e){return function(e){if(Array.isArray(e))return p(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return p(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return p(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function p(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var g,m,v,h,w,b=function(){var e=$(".js-btn-accordeon"),t=$(".js-info-accordeon"),r=$(".js-tab"),n=$(".js-product-all"),i=$(".js-product-show"),o=$(".js-list-prod"),a=$(".js-catalog-count"),s=$(".js-product"),c=$(".js-btn-catalog"),l=$(".js-review"),u=$(".js-reviews-all"),d=$(".js-reviews-show"),p=$(".js-btn-reviews");function g(e){var t=$('.js-list-prod[data-target="'.concat(e,'"]'));o.removeClass("active"),t.addClass("active")}return{openFaqContent:function(){e.on("click",(function(r){r.preventDefault();var n=$(this),i=n.parents(".js-accordeon");n.hasClass("active")||(i.find(t).slideUp(700),i.find(e).removeClass("active")),n.toggleClass("active"),n.next(t).slideToggle()}))},highlightingActiveTab:function(){var e=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:window.location.href;e=e.replace(/[\[\]]/g,"\\$&");var r=new RegExp("[?&]"+e+"(=([^&#]*)|&|#|$)"),n=r.exec(t);return n?n[2]?decodeURIComponent(n[2].replace(/\+/g," ")):"":null}("id");if(e){var t=$("#".concat(e));r.removeClass("active"),t.addClass("active"),g(e)}},showListProducts:function(){r.click((function(e){e.preventDefault();var t=$(this),n=t.prop("id");r.removeClass("active"),t.addClass("active"),g(n),b.calculateProducts()}))},showCatalog:function(){c.click((function(e){e.preventDefault();var t=$(this);t.parent(o).find(".js-catalog-hide").addClass("show"),b.calculateProducts(),t.hide()}))},calculateProducts:function(){var e=a.parent(".js-list-prod.active"),t=e.find(s).length,r=e.find(".js-catalog-show").find(s).length;!function(e,t){e==t?c.hide():c.show()}(r,t),e.find(".js-catalog-hide").hasClass("show")?(e.find(i).html(t),e.find(c).hide()):(e.find(i).html(r),e.find(n).html(t))},calculateReviews:function(){$(".js-reviews-show-list").hasClass("show")?(d.html(l.length),c.hide()):u.html(l.length)},showReviews:function(){p.click((function(e){e.preventDefault();var t=$(this);$(".js-reviews-show-list").addClass("show"),b.calculateReviews(),t.hide()}))},setLanguage:function(){var e=document.querySelector(".language"),t=document.querySelector(".select"),r=document.querySelector(".footer__lang"),n=f(t.querySelectorAll(".select__option")).map((function(e){return e.dataset.lang})),i=window.location.pathname.substring(1,3),o=n.includes(i),a=localStorage.getItem("localization");a&&!o&&(location.href="".concat(window.location.origin,"/").concat(a).concat(window.location.pathname).concat(window.location.search)),r.addEventListener("click",(function(){return e.classList.remove("language--hidden")})),e.addEventListener("click",(function(t){t.target.classList.contains("language")&&e.classList.add("language--hidden")})),window.addEventListener("load",(function(){o?localStorage.setItem("localization",i):e.classList.remove("language--hidden")}))},init:function(){b.openFaqContent(),b.highlightingActiveTab(),b.showListProducts(),b.showCatalog(),b.calculateProducts(),b.calculateReviews(),b.showReviews(),b.setLanguage()}}}(),y=b,j=r(0),S=r.n(j),P=(g=$(".js-popup"),m=$(".js-show-popup"),v=$(".js-show-frame-popup"),h=$(".js-frame-popup"),w=$(".js-overlay"),{addFramePopup:function(){if($(".js-show-frame-popup")){var e=$(".js-show-frame-popup").attr("data-src"),t=document.createElement("iframe");t.setAttribute("src",e),t.classList.add("frame-popup__iframe"),$(".frame-popup__content").append(t)}},initFramePopup:function(){v.click((function(e){h.toggleClass("active"),w.addClass("active"),h.removeClass("menu-mobile--active"),$(".js-burger").removeClass("burger--active"),S.a.on()}))},closeFramePopup:function(){$(".js-frame-close").click((function(e){h.removeClass("active"),w.removeClass("active"),S.a.off()}))},initPopUp:function(){m.click((function(e){e.preventDefault();var t=$(this),r=$(t.data("target"));t.toggleClass("active"),r.toggleClass("active"),w.addClass("active"),$(".menu-mobile").removeClass("menu-mobile--active"),$(".js-burger").removeClass("burger--active"),S.a.on()}))},closePopup:function(){$(".js-close").click((function(e){e.preventDefault(),g.removeClass("active"),m.removeClass("active"),w.removeClass("active"),S.a.off()}))},init:function(){P.addFramePopup(),P.initPopUp(),P.closePopup(),P.initFramePopup(),P.closeFramePopup()}}),C=P,k=$(document),O=$(window),I=function(){var e=$(".js-burger"),t=$(".js-scroll"),r=$(".js-overlay"),n=$(".js-fixed-menu"),i=n.height();function o(e){var t=e.offset().top;$("html, body").animate({scrollTop:t-15},800)}return{showFixedMenu:function(){k.scroll((function(){var e=k.scrollTop(),t="none",r="none";e<i?((e/i).toFixed(2),n.removeClass("menu--fixed")):(1,t="0px 0px 20px rgba(52, 49, 89, 0.1)",r="white",n.addClass("menu--fixed")),n.css({boxShadow:t,background:r})}))},showMobileMenu:function(){e.click((function(t){t.preventDefault(),$($(this).data("target")).toggleClass("menu-mobile--active"),e.toggleClass("burger--active"),r.toggleClass("active"),S.a.toggle()}))},scrollToTarget:function(){t.click((function(t){t.preventDefault(),S.a.off();var n=$(this),i=n.attr("href"),a=$(i);n.data("target")&&o($(n.data("target")));a.length&&o(a),$(".menu-mobile").removeClass("menu-mobile--active"),e.removeClass("burger--active"),r.removeClass("active")}))},init:function(){I.showMobileMenu(),I.showFixedMenu()}}}(),x=I;function T(e){return function(e){if(Array.isArray(e))return e}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return A(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return A(e,t)}(e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function A(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var E=function(){var e=$(".js-product-residue"),t=$('input[name="chatbot_history"]');var r=[],n=1;function i(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:window.location.href;e=e.replace(/[\[\]]/g,"\\$&");var r=new RegExp("[?&]"+e+"(=([^&#]*)|&|#|$)"),n=r.exec(t);return n?n[2]?decodeURIComponent(n[2].replace(/\+/g," ")):"":null}return{submitForm:function(){$("#order-form").submit((function(e){var i=T($(this).find(":input:not(:hidden)").serializeArray().map((function(e){return t={},r=e.name,n=e.value,r in t?Object.defineProperty(t,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[r]=n,t;var t,r,n}))).slice(0),o={countProduct:n};r=r.concat(o).concat(i),t.val(JSON.stringify(r))}))},createOrderForm:function(){var e=i("id");e&&($(".js-product-name").html(e),$(".js-product-photo").attr("src","img/".concat(e,".png")),$("input[name='redirect_url']").val("success.html?id=".concat(e)))},choiceCountProduct:function(){$(".js-counter-arrow-inc").click((function(e){e.preventDefault(),(n+=1)>20&&(n=20),$(".js-counter-number").html(n)})),$(".js-counter-arrow-dec").click((function(e){e.preventDefault(),(n-=1)<=1&&(n=1),$(".js-counter-number").html(n)}))},createSuccessPage:function(){var e=i("id");$(".js-success-product-name").html(e),$(".js-success-product-photo").attr("src","img/".concat(e,".png"))},showResiudePack:function(){var t=60;setInterval((function(){var r=function(e,t){var r=e+Math.random()*(t+1-e);return Math.floor(r)}(1,6);(t-=r)<=12||e.html(t)}),12e3)},init:function(){E.createOrderForm(),E.choiceCountProduct(),E.createSuccessPage(),E.showResiudePack(),E.submitForm()}}}(),z=E;function _(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function D(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?_(Object(r),!0).forEach((function(t){H(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):_(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function H(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var M=function(){var e={WIN_WIDTH:0},t={afterResize:!1,onInit:!1};function r(){return{WIN_WIDTH:O.width()}}function n(){var n,i,o,a;O.resize((n=function(){e=r(),t.afterResize&&t.afterResize(e)},i=100,function(){var e=this,t=arguments,r=function(){a=null,o||n.apply(e,t)},s=o&&!a;clearTimeout(a),a=setTimeout(r,i),s&&n.apply(e,t)}))}return{layoutHandler:function(i){i&&(t=D(D({},t),i)),e=r(),t.onInit&&t.onInit(e),n()}}}();$((function(){for(var e=(new Date).getFullYear(),t=document.getElementsByClassName("year"),r=0;r<t.length;r++){t[r].innerHTML=e}d.init(),y.init(),C.init(),x.init(),z.init(),i()(),M.layoutHandler({onInit:function(e){d.initProductSlider(),e.WIN_WIDTH>=480?d.initProductsSlider():e.WIN_WIDTH<=479&&d.destroyProductsSlider()},afterResize:function(e){d.initProductSlider(),e.WIN_WIDTH>=480?d.initProductsSlider():e.WIN_WIDTH<=479&&d.destroyProductsSlider()}})}))}]);