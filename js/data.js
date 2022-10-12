import { getRandomArrayElement } from './util.js';
import { getRandomIntegerFloat } from './util.js';
import { getRandomLengthArray } from './util.js';
import { getRandomIntegerInclusive } from './util.js';

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
const SIMILAR_RENTAL_COUNT = 10;

const createLocation = () => ({
  lat: getRandomIntegerFloat(35.65000, 35.70000),
  lng: getRandomIntegerFloat(139.70000, 139.80000),
});

const createOffer = () => ({
  title:getRandomArrayElement(TITLES),
  address:createLocation(),
  price:getRandomIntegerInclusive(100,100000),
  type:getRandomArrayElement(TYPES),
  rooms:getRandomIntegerInclusive(1,50),
  guests:getRandomIntegerInclusive(1,50),
  checkin:getRandomArrayElement(CHECKINS),
  checkout:getRandomArrayElement(CHECKOUTS),
  features:getRandomLengthArray(FEATURES),
  description:getRandomArrayElement(DESCRIPTIONS),
  photos:getRandomLengthArray(PHOTOS),
});

const createAuthor = (index) => ({
  avatar: `img/avatars/user${index.toString().padStart(2, '0')}.png`,
});

const createObjectOfNotice = (index) => ({
  author: createAuthor(index),
  offer: createOffer(),
  location: createLocation(),
});

const getObjectOfNotice = () => Array.from({length: SIMILAR_RENTAL_COUNT}, (_, offerIndex) => createObjectOfNotice(offerIndex + 1));

export { getObjectOfNotice };
