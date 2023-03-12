import { fetchPhotos } from './js/fetchPhotos';
import { getRefs } from './js/getRefs';
import { renderMarkup, clearMarkup } from './js/renderMarkup';
import { smoothScroll } from './js/smoothScroll';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = getRefs();
const FAILURE_MESSAGE =
  'Sorry, there are no images matching your search query. Please try again.';
const END_MESSAGE =
  "We're sorry, but you've reached the end of search results.";
const lightbox = new SimpleLightbox('.gallery a');
let page = 1;
let searchQuery = '';

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreButton.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();

  const form = e.currentTarget;
  searchQuery = form.elements.searchQuery.value;

  if (searchQuery.trim()) {
    clearMarkup();
    refs.loadMoreButton.classList.add('hidden');

    fetchPhotos(searchQuery, 1)
      .then(result => {
        if (result.totalHits === 0) {
          Notify.failure(FAILURE_MESSAGE);
          return;
        }
        if (result.totalHits > 40) {
          refs.loadMoreButton.classList.remove('hidden');
        }
        renderMarkup(result);
        lightbox.refresh();
        Notify.info(`Hooray! We found ${result.totalHits} images.`);
      })
      .catch(error => console.log(error))
      .finally(form.reset());
  }
}

function onLoadMore() {
  page += 1;
  fetchPhotos(searchQuery, page)
    .then(result => {
      renderMarkup(result);
      lightbox.refresh();
      smoothScroll();
      if (result.hits.length < 40) {
        refs.loadMoreButton.classList.add('hidden');
        Notify.info(END_MESSAGE);
      }
    })
    .catch(error => console.log(error));
}
