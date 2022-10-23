import { getArrayOfNoticeObjects } from './data.js';

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const mapCanvasElement = document.querySelector('#map-canvas');
const mapCanvasElements = getArrayOfNoticeObjects();
const popupFragment = document.createDocumentFragment();

const renderPhoto = (mapElement, photos) => {
  const photosContainer = mapElement.querySelector('.popup__photos');
  if (photos && photos.length) {
    const photosListFragment = document.createDocumentFragment();
    photos.forEach((photo) => {
      const photoListItem = mapElement.querySelector('.popup__photo');
      const clonePhotos = photoListItem.cloneNode(true);
      clonePhotos.src = photo;
      photosListFragment.appendChild(clonePhotos);
    });
    photosContainer.innerHTML = '';
    photosContainer.appendChild(photosListFragment);
  }
  else {
    photosContainer.classList.add('hidden');
  }
};

const renderDescription = (mapElement, description) => {
  const descriptionElement = mapElement.querySelector('.popup__description');
  if (description && description.length) {
    descriptionElement.textContent = description;
  }
  else {
    descriptionElement.classList.add('hidden');
  }
};

const renderFeatures = (mapElement, features) => {
  const featuresElement = mapElement.querySelector('.popup__features');
  if (features && features.length) {
    featuresElement.innerHTML = '';
    features.forEach((feature) => {
      const featuresListItem = document.createElement('li');
      featuresListItem.classList.add('popup__feature');
      featuresListItem.classList.add(`popup__feature--${ feature}`);
      featuresElement.appendChild(featuresListItem);
    });
  } else {
    featuresElement.classList.add('hidden');
  }
};

mapCanvasElements.forEach(({author, offer}) => {
  const {avatar} = author;
  const {title, price, rooms, guests, photos} = offer;
  const {description, features, checkin, checkout, type} = offer;
  const {address:{lat, lng}} = offer;

  const mapElement = cardTemplate.cloneNode(true);

  mapElement.querySelector('.popup__avatar').src = avatar;
  mapElement.querySelector('.popup__title').textContent = title;
  mapElement.querySelector('.popup__text--address').textContent = `${lat },${ lng}`;
  mapElement.querySelector('[data-price]').textContent = price;
  mapElement.querySelector('.popup__text--capacity').textContent = `${rooms } комнаты для ${ guests } гостей`;
  mapElement.querySelector('.popup__text--time').textContent = `Заезд после ${ checkin }, выезд до ${ checkout}`;
  mapElement.querySelector('.popup__type').textContent = type;

  renderPhoto(mapElement, photos);
  renderDescription(mapElement, description);
  renderFeatures(mapElement, features);

  if (!checkin || !checkout) {
    mapElement.querySelector('.popup__text--time').classList.add('hidden');
  }
  if (!type) {
    mapElement.querySelector('.popup__type').classList.add('hidden');
  }

  popupFragment.appendChild(mapElement);
});

const arrayFragment = popupFragment.querySelectorAll('.popup');
mapCanvasElement.appendChild(arrayFragment[2]);
