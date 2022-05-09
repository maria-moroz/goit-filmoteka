// import './sass/main.scss';
import renderPopularFilmCards from './renderPopularFilmCards';
import getData from './getData';
import saveConfiguration from './saveConfiguration';
import configuration from './configuration';

const options = {
  root: null,
  key: 'api_key=306e564986f0782b8ec4bf227b0f3c28',
  searchResults: {},
  base_url: 'none',
  poster_size: '',
  backdrop_sizes: [],
  genres: [],
  popularFilmsUrl: 'https://api.themoviedb.org/3/trending/movie/week?',
  configUrl: 'https://api.themoviedb.org/3/configuration?',
  genresUrl: 'https://api.themoviedb.org/3/genre/movie/list?',
};

options.root = document.querySelector('.movies');

renderPopFilms();

export default async function renderPopFilms() {
  //---getting array of films
  try {
    await saveConfiguration();
    const { data } = await getData(options.popularFilmsUrl + options.key);
    options.searchResults = data;
  } catch (error) {
    console.error('error is: ', error);
  }

  options.base_url = configuration.base_url;
  options.poster_size = configuration.poster_size;

  //---getting array of genres
  try {
    const { data } = await getData(options.genresUrl + options.key);
    options.genres = data.genres;
    console.log(options.genres);
  } catch (error) {
    console.error('error is: ', error);
  }

  //---rendering every card
  renderPopularFilmCards(options);
}