const navigationMobileToggle = document.querySelector('.js-toggle-button');
const navigationList = document.querySelector('.main-navigation__list');

navigationMobileToggle.addEventListener('click', () => {
  navigationList.classList.toggle('main-navigation__list--visible');
  navigationMobileToggle.classList.toggle('js-toggle-button--close');
  navigationMobileToggle.querySelector('.visually-hidden').textContent = navigationMobileToggle.classList.contains('js-toggle-button--close') ? 'Закрыть навигацию' : 'Открыть навигацию';
});
