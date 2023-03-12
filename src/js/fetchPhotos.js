import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '8210264-2ea871c1a05460bb4aaa242b8';
const LIMIT = 40;

export async function fetchPhotos(searchValue, pageNumber) {
  const response = await axios.get(`${BASE_URL}?key=${API_KEY}`, {
    params: {
      q: `${searchValue}`,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      per_page: LIMIT,
      page: pageNumber,
    },
  });
  return response.data;
}
