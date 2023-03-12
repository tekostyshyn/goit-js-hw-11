import { getRefs } from './getRefs';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
const refs = getRefs();

export function renderMarkup(photos) {
  const markup = photos
    .map(
      photo =>
        `<div class="photo-card">
        <a href="${photo.largeImageURL}">
          <img src="${photo.webformatURL}" alt="${photo.tags}" loading="lazy" />
          <div class="info">
            <p class="info-item">
              <b>Likes</b> 
              ${photo.likes}
            </p>
            <p class="info-item">
              <b>Views</b>
              ${photo.views}
            </p>
            <p class="info-item">
              <b>Comments</b>
              ${photo.comments}
            </p>
            <p class="info-item">
              <b>Downloads</b>
              ${photo.downloads}
            </p>
          </div>
          </a></div>`
    )
    .join('');

  refs.galleryContainer.insertAdjacentHTML('beforeend', markup);
}

export function clearMarkup() {
  refs.galleryContainer.innerHTML = '';
}
