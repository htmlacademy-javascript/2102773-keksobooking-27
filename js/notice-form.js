const noticeForm = document.querySelector('.ad-form');

const pristine = new Pristine(noticeForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'text-help',
});

const roomsField = noticeForm.querySelector('#room_number');
const capacityField = noticeForm.querySelector('#capacity');

function validateRooms () {
  if (roomsField.value < 100 && capacityField.value > 0) {
    return roomsField.value >= capacityField.value;
  }
  else {return roomsField.value >= 100 && capacityField.value <= 0;}
}

function gerRoomsErrorMessage () {
  let errorText;
  if (roomsField.value < 100 && capacityField.value > 0) {
    errorText = `Не более ${roomsField.value} ${roomsField.value <= 1 ? 'гостя' : 'гостей'}`;
  }
  else if (capacityField.value <= 0) {
    errorText = 'Только для 100 комнат';
  }
  else {
    errorText = 'Не для гостей';
  }
  return errorText;
}

pristine.addValidator(capacityField, validateRooms, gerRoomsErrorMessage);

const timein = noticeForm.querySelector('#timein');
const timeout = noticeForm.querySelector('#timeout');

timein.addEventListener('change', () =>{timeout.value = timein.value;});
timeout.addEventListener('change', () => {timein.value = timeout.value;});

const priceField = noticeForm.querySelector('#price');
const minPrice = {
  'bungalow' : 0,
  'flat' : 1000,
  'hotel' : 3000,
  'house' : 5000,
  'palace' : 10000
};
const typeField = noticeForm.querySelector('#type');

typeField.addEventListener('change', () => {
  priceField.placeholder = minPrice[typeField.value];
  priceField.min = minPrice[typeField.value];
});

function validatePrice () {
  return priceField.value >= Number(priceField.min);
}
function getPriceErrorMessage () {
  return `Не менее ${priceField.min} ₽/ночь`;
}

pristine.addValidator(priceField, validatePrice, getPriceErrorMessage);

noticeForm.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();
  if(!isValid) {evt.preventDefault();}
});
