import noScroll from "../global/noScroll";
const Popup = (function () {
  "use strict";
  const ButtonShowFramePopUp = $(".js-show-frame-popup");
  const framePopUpBlock = $(".js-frame-popup");
  const overlay = $(".js-overlay");
  return {
    addFramePopup: function (){
        if($('.js-show-frame-popup')){
          var link = $(".js-show-frame-popup").attr("data-src");
          var frame = document.createElement("iframe");
          frame.setAttribute("src", link)
          frame.classList.add("frame-popup__iframe");
          $('.frame-popup__content').append(frame)
        }
    },
    initFramePopup: function (){
      ButtonShowFramePopUp.click(function (e){
        framePopUpBlock.toggleClass("active");
        overlay.addClass("active");
        framePopUpBlock.removeClass("menu-mobile--active");
        $(".js-burger").removeClass("burger--active");
        noScroll.on();
      })
    },
    closeFramePopup: function () {
      $(".js-frame-close").click(function (e) {
        framePopUpBlock.removeClass("active");
        overlay.removeClass("active");
        noScroll.off();
      });
    },
    init: function () {
      Popup.addFramePopup();
      Popup.initFramePopup();
      Popup.closeFramePopup();
    },
  };
})();

export default Popup;
