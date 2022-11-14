const OFFERS_COUNT = 10;
const Price = {
  MIDDLE: 10000,
  HIGH: 50000,
};

const filterElement = document.querySelector('.map__filters');
const housingTypeInput = filterElement.querySelector('#housing-type');
const housingPriceInput = filterElement.querySelector('#housing-price');
const housingRoomsInput = filterElement.querySelector('#housing-rooms');
const housingGuestsInput = filterElement.querySelector('#housing-guests');
const featureCheckboxes = filterElement.querySelectorAll('.map__checkbox');

const deactivate = () => {
  filterElement.classList.add('map__filters--disabled');
  for (const filter of filterElement.children) {
    filter.disabled = true;
  }
};

const activate = () => {
  filterElement.classList.remove('map__filters--disabled');
  for (const filter of filterElement.children) {
    filter.disabled = false;
  }
};

const checkHousingType = (offers, type) =>
  housingTypeInput.value === offers.offer.type || type === 'any';

const checkHousingRooms = (offers, rooms) =>
  rooms === 'any' || offers.offer.rooms === Number(rooms);

const checkHousingGuests = (offers, guests) =>
  guests === 'any' || offers.offer.guests === Number(guests);

const checkHousingPrice = (offers, price) => {
  switch (price) {
    case 'any':
      return true;
    case 'low':
      return offers.offer.price < Price.MIDDLE;
    case 'middle':
      return (offers.offer.price < Price.HIGH && offers.offer.price >= Price.MIDDLE);
    case 'high':
      return offers.offer.price >= Price.HIGH;
  }
};

const checkHousingFeatures = (offers, features) => {
  if (!features.length) {
    return true;
  }

  if (!offers.offer.features) {
    return false;
  }

  return features.every((feature) => offers.offer.features.includes(feature));
};

const getFilteredOffers = (offers) => {

  const selectedType = housingTypeInput.value;
  const selectedPrice = housingPriceInput.value;
  const selectedRooms = housingRoomsInput.value;
  const selectedGuests = housingGuestsInput.value;

  const selectedFeatures = [];

  featureCheckboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      selectedFeatures.push(checkbox.value);
    }
  });

  const filteredOffers = [];

  for (let i = 0; i < offers.length; i++) {
    const offer = offers[i];
    if (
      checkHousingType(offer, selectedType) &&
      checkHousingRooms(offer, selectedRooms) &&
      checkHousingGuests(offer, selectedGuests) &&
      checkHousingPrice(offer, selectedPrice) &&
      checkHousingFeatures(offer, selectedFeatures)
    ) {

      filteredOffers.push(offer);
    }
    if (filteredOffers.length >= OFFERS_COUNT) {
      break;
    }
  }
  return filteredOffers;
};

const setOnFilterChange = (cb) => {
  filterElement.addEventListener('change', () => cb ());
};

export { deactivate, activate, setOnFilterChange, getFilteredOffers, OFFERS_COUNT, filterElement };
