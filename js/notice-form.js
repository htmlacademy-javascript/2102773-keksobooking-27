const noticeForm = document.querySelector('.ad-form');

const pristine = new Pristine(noticeForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'text-help',
}, false);

function validateTitle (value) {
  return value.length >= 30 && value.length <= 100;
}

pristine.addValidator(noticeForm.querySelector('#title'), validateTitle, 'От 30 до 100 символов');

function validatePrice (value) {
  return value <= 10000;
}
pristine.addValidator(noticeForm.querySelector('#price'), validatePrice, 'Максимальная цена за ночь 100000');

const roomsField = noticeForm.querySelector('[name="rooms"]');
const capacityField = noticeForm.querySelector('#capacity');
const roomsOption = {
  '1' : ['1'],
  '2' : ['2', '1'],
  '3' : ['3', '2', '1'],
  '100' : ['0']
};

function validateRooms () {
  return roomsOption[roomsField.value].includes(capacityField.value);
}

function gerRoomsErrorMassage () {
  let error;
  if (roomsField.value <= 1) {
    error = 'Только для одного гостя';
  }
  else if (roomsField.value > 1 && roomsField.value < 3) {
    error = 'Только для одного или двух гостей';
  }
  else if (roomsField.value <= 3 && roomsField.value > 2) {
    error = 'Для одного, двух или трех гостей';
  }
  else {
    error = 'Не для гостей';
  }
  return error;
}
pristine.addValidator(capacityField, validateRooms, gerRoomsErrorMassage);

noticeForm.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();
  if(!isValid) {evt.preventDefault();}
});
