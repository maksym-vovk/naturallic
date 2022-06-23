// Main JS module
// objectFitImages polyfill
import objectFitImages from "object-fit-images";
import Sliders from "./modules/Sliders";
import Controls from "./modules/Controls";
import Popup from "./modules/Popup";
import Menu from "./modules/Menu";
import layout from "./global/layout";

$(function () {
  var year = new Date().getFullYear();
  var placeY = document.getElementsByClassName("year");
  for (let i = 0; i < placeY.length; i++) {
    var elemY = placeY[i];
    elemY.innerHTML = year;
  }

  Sliders.init();
  Controls.init();
  Popup.init();
  Menu.init();

  objectFitImages();

  layout.layoutHandler({
    onInit: (layout) => {
      Sliders.initProductSlider();
      if (layout.WIN_WIDTH >= 480) {
        Sliders.initProductsSlider();
      } else if (layout.WIN_WIDTH <= 479) {
        Sliders.destroyProductsSlider();
      }
    },

    afterResize: (layout) => {
      Sliders.initProductSlider();
      if (layout.WIN_WIDTH >= 480) {
        Sliders.initProductsSlider();
      } else if (layout.WIN_WIDTH <= 479) {
        Sliders.destroyProductsSlider();
      }
    },
  });
});
