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
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
let page = 1;
let searchQuery = '';

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreButton.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();
  clearMarkup();
  refs.loadMoreButton.classList.remove('hidden');

  const form = e.currentTarget;
  searchQuery = form.elements.searchQuery.value;

  fetchPhotos(searchQuery, 1)
    .then(result => {
      checkFetchedResult(result);
      renderMarkup(result);
      lightbox.refresh();
    })
    .catch(error => console.log(error))
    .finally(form.reset());
}

function checkFetchedResult(result) {
  if (result.length === 0) {
    Notify.failure(FAILURE_MESSAGE);
    return;
  }
}

function onLoadMore() {
  page += 1;
  fetchPhotos(searchQuery, page)
    .then(result => {
      renderMarkup(result);
      lightbox.refresh();
      smoothScroll();
    })
    .catch(error => console.log(error));
}
