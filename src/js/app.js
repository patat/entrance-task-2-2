/*
* Main entrypoint
*
*/
import headerMenu from '../modules/header-menu/header-menu';

export default function app() {
  document.addEventListener('DOMContentLoaded', function() {
    console.log('It works!');
    headerMenu();
  });
}