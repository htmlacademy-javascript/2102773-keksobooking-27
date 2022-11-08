import { onPriceChange, sliderReset } from './slider.js';
import { openErrorMessage } from './message-popup.js';
import { sendData } from './api.js';
import { markerReset, setAddress, START_COORDINATE } from './map.js';

const noticeForm = document.querySelector('.ad-form');
const timein = noticeForm.querySelector('#timein');
const timeout = noticeForm.querySelector('#timeout');
const priceField = noticeForm.querySelector('#price');
const typeField = noticeForm.querySelector('#type');
const submitButton = document.querySelector('.ad-form__submit');
const resetButton = document.querySelector('.ad-form__reset');

const minPrice = {
  'bungalow' : 0,
  'flat' : 1000,
  'hotel' : 3000,
  'house' : 5000,
  'palace' : 10000
};

const onTimeoutChange = () => {
  timeout.value = timein.value;
};
const onTimeinChange = () => {
  timein.value = timeout.value;
};
const onTypeChange = () => {
  priceField.placeholder = minPrice[typeField.value];
  priceField.min = minPrice[typeField.value];
};

const toggleOff = () => {
  noticeForm.classList.add('ad-form--disabled');
  const fieldsets = noticeForm.querySelectorAll('fieldset');
  fieldsets.forEach((fieldset) => {
    fieldset.disabled = true;
  });
  timein.removeEventListener('change', onTimeoutChange);
  timeout.removeEventListener('change', onTimeinChange);
  typeField.removeEventListener('change', onTypeChange);
  priceField.removeEventListener('change', onPriceChange);
};

const toggleOn = () => {
  noticeForm.classList.remove('ad-form--disabled');
  const fieldsets = noticeForm.querySelectorAll('fieldset');
  fieldsets.forEach((fieldset) => {
    fieldset.disabled = false;
  });
  timein.addEventListener('change', onTimeoutChange);
  timeout.addEventListener('change', onTimeinChange);
  typeField.addEventListener('change', onTypeChange);
  priceField.addEventListener('change', onPriceChange);
};

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

function gerRoomsErrorMassage () {
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

pristine.addValidator(capacityField, validateRooms, gerRoomsErrorMassage);

function validatePrice () {
  return priceField.value >= Number(priceField.min);
}
function getPriceErrorMessage () {
  return `Не менее ${priceField.min} ₽/ночь`;
}

pristine.addValidator(priceField, validatePrice, getPriceErrorMessage);

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Отправляю...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const setSubmit = (onSuccess) => {
  noticeForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if(isValid) {
      blockSubmitButton();
      sendData(
        () => {
          evt.target.reset();
          onSuccess();
          unblockSubmitButton();
          sliderReset();
        },
        () => {
          openErrorMessage ();
          unblockSubmitButton();
        },
        new FormData(evt.target),
      );
    }
  });
};
const setReset = () => {
  resetButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    noticeForm.reset();
    sliderReset();
    markerReset(START_COORDINATE);
    setAddress(START_COORDINATE);
  });
};

export { toggleOff, toggleOn, setSubmit, setReset };
