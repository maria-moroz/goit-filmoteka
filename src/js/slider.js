import axios from 'axios';

const sliders = document.querySelector('.carouselbox');
const left = document.querySelector('.switchleft');
const right = document.querySelector('.switchright');
let scrollPerClick;
let imagePadding = 20;

if (window.matchMedia('(min-device-width: 768px)').matches) {
  showMovieData();
}

let scrollAmount = 0;

right.addEventListener('click', function sliderScrollRight() {
  sliders.scrollTo({
    top: 0,
    left: (scrollAmount += scrollPerClick),
    behavior: 'smooth',
  });
});

left.addEventListener('click', function sliderScrollLeft() {
  sliders.scrollTo({
    top: 0,
    left: (scrollAmount -= scrollPerClick),
    behavior: 'smooth',
  });

  if (scrollAmount < 0) {
    scrollAmount = 0;
  }
});

async function showMovieData() {
  console.log('show');
  const api_key = '306e564986f0782b8ec4bf227b0f3c28';

  let result = await axios.get(
    'https://api.themoviedb.org/3/discover/movie?api_key=' + api_key + '&sort_by=popularity.desc',
  );

  result = result.data.results;

  result.map(function (cur, index) {
    sliders.insertAdjacentHTML(
      'beforeend',
      `<img class="img-${index} slider-img lazyload" 
      data-src="https://image.tmdb.org/t/p/w185/${cur.poster_path}"
      alt="${cur.title}" 
      data-id="${cur.id}" />`,
    );
  });

  scrollPerClick = 400;
}

export function showSlider() {
  document.querySelector('.slider').classList.remove('visually-hidden');
}

export function hideSlider() {
  document.querySelector('.slider').classList.add('visually-hidden');
}