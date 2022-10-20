import { getArrayOfNoticeObjects } from './data.js';

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const mapCanvas = document.querySelector('#map-canvas');
const mapsCanvas = getArrayOfNoticeObjects();
const popupFragment = document.createDocumentFragment();

mapsCanvas.forEach(({author:{avatar}, offer:{title, address:{lat, lng}, price, description, checkin, checkout, rooms, guests, type, features, photos}}) => {
  const mapElement = cardTemplate.cloneNode(true);

  mapElement.querySelector('.popup__avatar').src = avatar;

  const featuresConteiner = mapElement.querySelector('.popup__features');
  featuresConteiner.innerHTML = '';
  features.forEach((feature) => {
    const featuresListItem = document.createElement('li');
    featuresListItem.classList.add('popup__feature');
    featuresListItem.classList.add(`popup__feature--${ feature}`);
    featuresConteiner.appendChild(featuresListItem);
  });

  const photosContainer = mapElement.querySelector('.popup__photos');
  const photosListFragment = document.createDocumentFragment();
  photos.forEach((photo) => {
    const photoListItem = mapElement.querySelector('.popup__photo');
    const clonePhotos = photoListItem.cloneNode(true);
    clonePhotos.src = photo;
    photosListFragment.appendChild(clonePhotos);
  });
  photosContainer.innerHTML = '';
  photosContainer.appendChild(photosListFragment);

  mapElement.querySelector('.popup__title').textContent = title;
  mapElement.querySelector('.popup__text--address').textContent = `${lat },${ lng}`;
  mapElement.querySelector('.popup__text--price').textContent = `${price } ₽/ночь`;
  mapElement.querySelector('.popup__description').textContent = description;
  mapElement.querySelector('.popup__text--capacity').textContent = `${rooms } комнаты для ${ guests } гостей`;
  mapElement.querySelector('.popup__text--time').textContent = `Заезд после ${ checkin }, выезд до ${ checkout}`;
  mapElement.querySelector('.popup__type').textContent = type;

  if (!description) {
    mapElement.querySelector('.popup__description').classList.add('hidden');
  }
  if(features <= []) {
    featuresConteiner.classList.add('hidden');
  }
  if (!checkin || !checkout) {
    mapElement.querySelector('.popup__text--time').classList.add('hidden');
  }
  if (!type) {
    mapElement.querySelector('.popup__type').classList.add('hidden');
  }

  popupFragment.appendChild(mapElement);
});
const arrayFragment = popupFragment.querySelectorAll('.popup');
mapCanvas.appendChild(arrayFragment[2]);
