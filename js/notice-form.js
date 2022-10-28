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

noticeForm.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();
  if(!isValid) {evt.preventDefault();}
});
