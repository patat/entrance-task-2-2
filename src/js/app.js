/*
* Main entrypoint
*/

import mainMenu from '../modules/main-menu/main-menu';
import swipeCards from '../modules/swipe-cards/swipe-cards';
import Modal from '../modules/modal/modal';
import WidgetSlider from '../modules/widget-slider/widget-slider';
import WidgetWheel from '../modules/widget-wheel/widget-wheel';

export default function app() {
  document.addEventListener('DOMContentLoaded', function() {
    mainMenu();
    swipeCards('.swipe-cards--events');
    swipeCards('.swipe-cards--scripts', {
      perSlide: 9
    });
    swipeCards('.swipe-cards--devices', {
      perSlide: 6
    });

    const cards = document.querySelectorAll('.swipe-card--event');
    const modalLightEl = document.querySelector('.modal--light');
    const modalLight = new Modal(modalLightEl);
    cards[0].addEventListener('click', function() {
      modalLight.open();
    });
    const modalTemperatureEl = document.querySelector('.modal--temperature');
    const modalTemperature = new Modal(modalTemperatureEl);
    cards[1].addEventListener('click', function() {
      modalTemperature.open();
    });
    const modalFloorEl = document.querySelector('.modal--floor');
    const modalFloor = new Modal(modalFloorEl);
    cards[2].addEventListener('click', function() {
      modalFloor.open();
    });

    const widgetSliderEl1 = document.querySelector('.widget-slider--light');
    const widgetSlider1 = new WidgetSlider(widgetSliderEl1);

    const widgetSliderEl2 = document.querySelector('.widget-slider--temperature');
    const widgetSlider2 = new WidgetSlider(widgetSliderEl2);

    const widgetWheelEl = document.querySelector('.wheel');
    const widgetWheel = new WidgetWheel(widgetWheelEl);

  });
}