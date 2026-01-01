// js/nav.js
function initNavMenu() {
  const burger = document.querySelector('.hamburger');
  const menu = document.querySelector('.nav-menu1');
  if (!burger || !menu || burger.dataset.navBound) return;
  burger.dataset.navBound = 'true';
  burger.addEventListener('click', () => menu.classList.toggle('open'));
}

window.initNavMenu = initNavMenu;
document.addEventListener('DOMContentLoaded', initNavMenu);
