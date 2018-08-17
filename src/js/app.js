/*
* Main entrypoint
*/

import mainMenu from '../modules/main-menu/main-menu';
import swipeCards from '../modules/swipe-cards/swipe-cards';

export default function app() {
  document.addEventListener('DOMContentLoaded', function() {
    console.log('It works!');
    mainMenu();
    swipeCards('.swipe-cards--events');
  });
}