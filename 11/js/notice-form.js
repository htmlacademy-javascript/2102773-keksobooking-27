import { onPriceChange, sliderReset } from './slider.js';
import { openErrorMessage } from './message-popup.js';
import { sendData } from './api.js';
import { markerReset, setAddress, START_COORDINATE } from './map.js';
import { filterElement } from './filter.js';

const DEFAULT_AVATAR = 'img/muffin-grey.svg';
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const noticeForm = document.querySelector('.ad-form');
const timein = noticeForm.querySelector('#timein');
const timeout = noticeForm.querySelector('#timeout');
const priceField = noticeForm.querySelector('#price');
const typeField = noticeForm.querySelector('#type');
const submitButton = document.querySelector('.ad-form__submit');
const resetButton = document.querySelector('.ad-form__reset');
const avatarChooser = document.querySelector('.ad-form__field input[type=file]');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const photoChooser = document.querySelector('.ad-form__upload input[type=file]');
const previewPhoto = document.querySelector('.ad-form__photo');

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

const disable = () => {
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

const enable = () => {
  noticeForm.classList.remove('ad-form--disabled');
  const fieldsets = noticeForm.querySelectorAll('fieldset');
  fieldsets.forEach((fieldset) => {
    fieldset.disabled = false;
  });
  onTypeChange();
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

const submit = (onSuccess) => {
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
          onTypeChange();
          previewPhoto.innerHTML = '';
          avatarPreview.src = DEFAULT_AVATAR;
          filterElement.reset();
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
const reset = (cb) => {
  resetButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    noticeForm.reset();
    sliderReset();
    markerReset(START_COORDINATE);
    setAddress(START_COORDINATE);
    onTypeChange();
    previewPhoto.innerHTML = '';
    avatarPreview.src = DEFAULT_AVATAR;
    filterElement.reset();
    cb();
  });
};
const isValidType = (file) => {
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  return matches;
};

const avatarLoad = () => {avatarChooser.addEventListener('change', () => {
  const file = avatarChooser.files[0];

  if (file && isValidType(file)) {
    avatarPreview.src = URL.createObjectURL(file);
  }
});
};

const photoLoad = () => {photoChooser.addEventListener('change', () => {
  const file = photoChooser.files[0];

  if (file && isValidType(file)) {
    previewPhoto.innerHTML = '';
    const photo = document.createElement('img');
    photo.src = URL.createObjectURL(file);
    photo.style.height = '100%';
    photo.style.width = '100%';
    photo.style.objectFit = 'contain';
    previewPhoto.appendChild(photo);
  }
});
};

export { disable, enable, submit, reset, avatarLoad, photoLoad };
