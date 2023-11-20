import { fetchBreeds } from './cat-api';
import SlimSelect from 'slim-select';
import { fetchCatByBreed } from './cat-api';
import axios from 'axios';
import Notiflix from 'notiflix';

const refs = {
  selecter: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info'),
};


refs.loader.style.display = 'block';
fetchBreeds()
  .then(data => {
    refs.selecter.innerHTML = data;
    refs.loader.style.display = 'none';
  
     refs.selecter.style.display = 'block';
      new SlimSelect({
        select: `#refs.selecter`,
      });
   
  })
  .catch(err => {
    console.log(err);
    Notiflix.Notify.failure(
      'Oops! Something went wrong! Try reloading the page!'
    );
    refs.loader.style.display = 'none';
  });

refs.selecter.addEventListener('change', selecterEvent);

function selecterEvent(event) {
  refs.catInfo.style.display = 'none';
  refs.loader.style.display = 'block';

  const selectedValue = event.target.value;

  fetchCatByBreed(selectedValue)
    .then(data => {
      refs.loader.style.display = 'none';
      refs.catInfo.innerHTML = data;
      refs.catInfo.style.display = 'flex';
    })
    .catch(err => {
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
      refs.loader.style.display = 'none';
      console.log(err);
    });
}
