import { onPriceChange, resetSlider } from './slider.js';
import { openErrorMessage } from './message-popup.js';
import { sendData } from './api.js';
import { filterElement } from './filter.js';

const DEFAULT_AVATAR = 'img/muffin-grey.svg';
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const noticeFormElement = document.querySelector('.ad-form');
const timeinElement = noticeFormElement.querySelector('#timein');
const timeoutElement = noticeFormElement.querySelector('#timeout');
const priceElement = noticeFormElement.querySelector('#price');
const typeElement = noticeFormElement.querySelector('#type');
const submitButton = document.querySelector('.ad-form__submit');
const resetButton = document.querySelector('.ad-form__reset');
const avatarElement = document.querySelector('.ad-form__field input[type=file]');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const photoElement = document.querySelector('.ad-form__upload input[type=file]');
const photoPreview = document.querySelector('.ad-form__photo');

const minPrice = {
  'bungalow' : 0,
  'flat' : 1000,
  'hotel' : 3000,
  'house' : 5000,
  'palace' : 10000
};

const onTimeoutChange = () => {
  timeoutElement.value = timeinElement.value;
};
const onTimeinChange = () => {
  timeinElement.value = timeoutElement.value;
};
const onTypeChange = () => {
  priceElement.placeholder = minPrice[typeElement.value];
  priceElement.min = minPrice[typeElement.value];
};

const disable = () => {
  noticeFormElement.classList.add('ad-form--disabled');
  const fieldsets = noticeFormElement.querySelectorAll('fieldset');
  fieldsets.forEach((fieldset) => {
    fieldset.disabled = true;
  });
  timeinElement.removeEventListener('change', onTimeoutChange);
  timeoutElement.removeEventListener('change', onTimeinChange);
  typeElement.removeEventListener('change', onTypeChange);
  priceElement.removeEventListener('change', onPriceChange);
};

const enable = () => {
  noticeFormElement.classList.remove('ad-form--disabled');
  const fieldsets = noticeFormElement.querySelectorAll('fieldset');
  fieldsets.forEach((fieldset) => {
    fieldset.disabled = false;
  });
  onTypeChange();
  timeinElement.addEventListener('change', onTimeoutChange);
  timeoutElement.addEventListener('change', onTimeinChange);
  typeElement.addEventListener('change', onTypeChange);
  priceElement.addEventListener('change', onPriceChange);
};

const pristine = new Pristine(noticeFormElement, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'text-help',
});

const roomsField = noticeFormElement.querySelector('#room_number');
const capacityField = noticeFormElement.querySelector('#capacity');

function validateRooms () {
  if (roomsField.value < 100 && capacityField.value > 0) {
    return roomsField.value >= capacityField.value;
  }
  return roomsField.value >= 100 && capacityField.value <= 0;
}

function gerRoomsErrorMassage () {
  if (roomsField.value < 100 && capacityField.value > 0) {
    return `Не более ${roomsField.value} ${roomsField.value <= 1 ? 'гостя' : 'гостей'}`;
  }
  if (capacityField.value <= 0) {
    return 'Только для 100 комнат';
  }
  return 'Не для гостей';
}

pristine.addValidator(capacityField, validateRooms, gerRoomsErrorMassage);

function validatePrice () {
  return priceElement.value >= Number(priceElement.min);
}
function getPriceErrorMessage () {
  return `Не менее ${priceElement.min} ₽/ночь`;
}

pristine.addValidator(priceElement, validatePrice, getPriceErrorMessage);

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Отправляю...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const submit = (onSuccess) => {
  noticeFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if(isValid) {
      blockSubmitButton();
      sendData(
        () => {
          evt.target.reset();
          onSuccess();
          unblockSubmitButton();
          resetSlider();
          onTypeChange();
          photoPreview.innerHTML = '';
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
    noticeFormElement.reset();
    resetSlider();
    onTypeChange();
    photoPreview.innerHTML = '';
    avatarPreview.src = DEFAULT_AVATAR;
    filterElement.reset();
    cb();
  });
};
const isValidType = (file) => {
  const fileName = file.name.toLowerCase();
  return FILE_TYPES.some((it) => fileName.endsWith(it));
};

const changeAvatar = () => {avatarElement.addEventListener('change', () => {
  const file = avatarElement.files[0];

  if (file && isValidType(file)) {
    avatarPreview.src = URL.createObjectURL(file);
  }
});
};

const changePhoto = () => {photoElement.addEventListener('change', () => {
  const file = photoElement.files[0];

  if (file && isValidType(file)) {
    photoPreview.innerHTML = '';
    const photo = document.createElement('img');
    photo.src = URL.createObjectURL(file);
    photo.style.height = '100%';
    photo.style.width = '100%';
    photo.style.objectFit = 'contain';
    photoPreview.appendChild(photo);
  }
});
};

export { disable, enable, submit, reset, changeAvatar, changePhoto };
