/*
* Main entrypoint
*/

import mainMenu from '../modules/main-menu/main-menu';

export default function app() {
  document.addEventListener('DOMContentLoaded', function() {
    console.log('It works!');
    mainMenu(document.querySelector('.main-menu'));
  });
}