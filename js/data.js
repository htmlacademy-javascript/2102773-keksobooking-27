import { getRandomArrayElement, getRandomIntegerFloat, getRandomLengthArray, getRandomIntegerInclusive } from './util.js';

const TITLES = [
  'Заголовок 1',
  'Заголовок 2',
  'Заголовок 3',
  'Заголовок 4',
  'Заголовок 5',
  'Заголовок 6',
  'Заголовок 7',
  'Заголовок 8',
  'Заголовок 9',
  'Заголовок 10',
];
const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];
const CHECKINS = [
  '12:00',
  '13:00',
  '14:00',
];
const CHECKOUTS = [
  '12:00',
  '13:00',
  '14:00',
];
const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
const DESCRIPTIONS = [
  'Описание 1',
  'Описание 2',
  'Описание 3',
  'Описание 4',
  'Описание 5',
  'Описание 6',
  'Описание 7',
  'Описание 8',
  'Описание 9',
  'Описание 10',
];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];
const Location = {
  MIN_LATITUDE: 35.65000,
  MAX_LALITUDE: 35.70000,
  MIN_LONGITUDE: 139.70000,
  MAX_LONGITUDE: 139.80000
};
const Price = {
  MIN_PRICE: 100,
  MAX_PRISE: 10000
};
const Rooms = {
  MIN_ROOMS: 1,
  MAX_ROOMS: 50
};
const Guests = {
  MIN_GUESTS: 1,
  MAX_GUESTS: 50
};

const SIMILAR_RENTAL_COUNT = 10;

const TYPES_DICTIONARY = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house:'Дом',
  palace:'Дворец',
  hotel:'Отель'
};

const getLocation = () => ({
  lat: getRandomIntegerFloat(Location.MIN_LATITUDE, Location.MAX_LALITUDE),
  lng: getRandomIntegerFloat(Location.MIN_LONGITUDE, Location.MAX_LONGITUDE),
});

const getOffer = () => ({
  title:getRandomArrayElement(TITLES),
  address:getLocation(),
  price:getRandomIntegerInclusive(Price.MIN_PRICE,Price.MAX_PRISE),
  type:TYPES_DICTIONARY[(getRandomArrayElement(TYPES))],
  rooms:getRandomIntegerInclusive(Rooms.MIN_ROOMS,Rooms.MAX_ROOMS),
  guests:getRandomIntegerInclusive(Guests.MIN_GUESTS,Guests.MAX_GUESTS),
  checkin:getRandomArrayElement(CHECKINS),
  checkout:getRandomArrayElement(CHECKOUTS),
  features:getRandomLengthArray(FEATURES),
  description:getRandomArrayElement(DESCRIPTIONS),
  photos:getRandomLengthArray(PHOTOS),
});

const getAuthor = (index) => ({
  avatar: `img/avatars/user${index.toString().padStart(2, '0')}.png`,
});

const getObjectOfNotice = (index) => ({
  author: getAuthor(index),
  offer: getOffer(),
  location: getLocation(),
});
const getArrayOfNoticeObjects = () => Array.from({length: SIMILAR_RENTAL_COUNT}, (_, offerIndex) => getObjectOfNotice(offerIndex + 1));

export { getArrayOfNoticeObjects };
