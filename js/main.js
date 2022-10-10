function getRandomIntegerInclusive(min, max) {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  if (min < 0 || max < 0) {
    return NaN;
  }
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function getRandomIntegerFloat(min, max, precision = 5) {
  if (min < 0 || max < 0 || precision < 0) {
    return NaN;
  }
  if (min > max) {
    return getRandomIntegerFloat(max, min, precision);
  }
  return +(Math.random() * (max - min) + min).toFixed(precision);
}

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
const avatars = [];

const createLocation = () => ({
  lat: getRandomIntegerFloat(35.65000, 35.70000),
  lng: getRandomIntegerFloat(139.70000, 139.80000),
});

const getRandomArrayElement = (elements) => elements[getRandomIntegerInclusive(0, elements.length - 1)];

const getRandomLengthArray = (arrayOriginal) => {
  const arr = Array.from(arrayOriginal);
  const newArray = new Array(getRandomIntegerInclusive(1, arr.length));

  for (let i = 0; i < newArray.length; i++) {
    newArray[i] = arr.splice(getRandomIntegerInclusive(0, arr.length - 1), 1).join();
  }
  return newArray;
};

const createOffer = () => ({
  title:Array.from(TITLES.shift()).join(''),
  address:createLocation(),
  price:getRandomIntegerInclusive(100,100000),
  type:getRandomArrayElement(TYPES),
  rooms:getRandomIntegerInclusive(1,50),
  guests:getRandomIntegerInclusive(1,50),
  checkin:getRandomArrayElement(CHECKINS),
  checkout:getRandomArrayElement(CHECKOUTS),
  features:getRandomLengthArray(FEATURES),
  description:Array.from(DESCRIPTIONS.shift()).join(''),
  photos:getRandomLengthArray(PHOTOS),
});

const createAvatar = () => {
  for(let i = 1; i <= 10; i++) {
    const avatar = i === 10 ? `img/avatars/user${i}.png` : `img/avatars/user0${i}.png`;
    avatars.push(avatar);
  }
};
createAvatar();

const createObjectOfNotice = () => ({
  author: avatars.shift(),
  offer: createOffer(),
  location: createLocation(),
});

Array.from({length: SIMILAR_RENTAL_COUNT}, createObjectOfNotice);

