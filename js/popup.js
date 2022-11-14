const TYPES_DICTIONARY = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house:'Дом',
  palace:'Дворец',
  hotel:'Отель'
};

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
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

const getRoomsEnding = (roomCount) => {
  switch (roomCount) {
    case 1:
      return 'комната';
    case 2:
    case 3:
    case 4:
      return 'комнаты';
    default:
      return 'комнат';
  }
};

const getGuestsEnding = (guestCount) => {
  switch (guestCount) {
    case 0:
      return 'не для гостей';
    case 1:
      return `для ${guestCount} гостя`;
    default:
      return `для ${guestCount} гостей`;
  }
};

const renderElements = (index) => {
  const {avatar} = index.author;
  const {title, price, rooms, guests, photos} = index.offer;
  const {description, features, checkin, checkout, type} = index.offer;
  const {address} = index.offer;

  const mapElement = cardTemplate.cloneNode(true);

  mapElement.querySelector('.popup__avatar').src = avatar;
  mapElement.querySelector('.popup__title').textContent = title;
  mapElement.querySelector('.popup__text--address').textContent = address;
  mapElement.querySelector('[data-price]').textContent = price;
  mapElement.querySelector('.popup__text--capacity').textContent = `${rooms} ${getRoomsEnding(rooms)} ${getGuestsEnding(guests)}`;
  mapElement.querySelector('.popup__text--time').textContent = `Заезд после ${ checkin }, выезд до ${ checkout}`;
  mapElement.querySelector('.popup__type').textContent = TYPES_DICTIONARY[(type)];

  renderPhoto(mapElement, photos);
  renderDescription(mapElement, description);
  renderFeatures(mapElement, features);

  if (!checkin || !checkout) {
    mapElement.querySelector('.popup__text--time').classList.add('hidden');
  }
  if (!type) {
    mapElement.querySelector('.popup__type').classList.add('hidden');
  }
  return mapElement;
};

export { renderElements };
