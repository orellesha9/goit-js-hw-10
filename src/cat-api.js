import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_vzu9YknusAds5E3LOSR5kRyBXwuAXPYrNpUXQS2HL6YkZX0biUuaS2uJzqFjfMfx';

export function fetchBreeds(arr) {
  const BASE_URL = 'https://api.thecatapi.com/v1/breeds';

  return axios.get(BASE_URL).then(({ data }) => {
    return data
      .map(({ id, name }) => `<option value="${id}">${name}</option>`)
      .join('');
  });
}

const API_KEY =
  'live_vzu9YknusAds5E3LOSR5kRyBXwuAXPYrNpUXQS2HL6YkZX0biUuaS2uJzqFjfMfx';

export function fetchCatByBreed(breedId) {
  const BASE_URL_SEARCH = 'https://api.thecatapi.com/v1/images/search';
  const END_POINT = 'breed_ids=';
  const params = new URLSearchParams({
    'x-api-key': API_KEY,
  });

  return axios
    .get(`${BASE_URL_SEARCH}?${END_POINT}${breedId}`)
    .then(({ data }) => {
      return data
        .map(data => {
          return `<img src="${data.url}" style="width: 400px; height: 300px;"><div style="padding-left: 20px;"><h2>${data.breeds[0].name}</h2><p width="100px">${data.breeds[0].description}</p><p><span style="font-weight: bold;">Temperament:</span>${data.breeds[0].temperament}</p></div>`;
        })
        .join('');
    });
}
