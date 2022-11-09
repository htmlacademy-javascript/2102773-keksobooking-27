import { showAlert } from './util.js';
const GET_LINK = 'https://27.javascript.pages.academy/keksobooking/data';
const SEND_LINK = 'https://27.javascript.pages.academy/keksobooking';

const getData = (onSuccess) => {
  fetch(GET_LINK)
    .then((response) => response.json())
    .then((offers) => {
      onSuccess(offers);
    })
    .catch(() => {
      showAlert('Не загрузить данные с сервера. Попробуйте ещё раз');
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    SEND_LINK,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail ();
      }
    }
    )
    .catch(() => {
      onFail ();
    });
};

export { getData, sendData };
