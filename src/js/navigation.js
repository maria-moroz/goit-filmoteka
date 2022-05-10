import { changeToHomeHeaderMarkup } from './dynamicHeaderMarkup';
import { changeToLibraryHeaderMarkup } from './dynamicHeaderMarkup';
import { onWatchedBtnClick } from './libraryButtons';
import { queueBtnToggleOff } from './libraryButtons';
import { watchedBtnToggleOff } from './libraryButtons';
import renderPopFilms from './showMovieGallery';

const refs = {
  logo: document.querySelector('.logo'),
  navItems: document.querySelector('.nav__list'),
  container: document.querySelector('.movies'),
  slider: document.querySelector('.slider'),
};

refs.navItems.addEventListener('click', onNavItemClick);
refs.logo.addEventListener('click', onLogoClick);

const homeMarkup = () => {
  clearContainer();
  changeToHomeHeaderMarkup();
  renderPopFilms();
  queueBtnToggleOff();
  watchedBtnToggleOff();
  refs.slider.classList.remove('visually-hidden');
};

const libraryMarkup = () => {
  clearContainer();
  changeToLibraryHeaderMarkup();
  onWatchedBtnClick();
};

function onNavItemClick(e) {
  if (e.target.innerText !== undefined && e.target.innerText.toLowerCase() === 'home') {
    homeMarkup();
  } else if (
    e.target.innerText !== undefined &&
    e.target.innerText.toLowerCase() === 'my library'
  ) {
    libraryMarkup();
  }
}

function onLogoClick(e) {
  if (e.currentTarget.className !== undefined && e.currentTarget.className === 'logo') {
    homeMarkup();
  }
}

function clearContainer() {
  refs.slider.classList.add('visually-hidden');
  if (refs.container.innerHTML !== '') {
    refs.container.innerHTML = '';
  }
}