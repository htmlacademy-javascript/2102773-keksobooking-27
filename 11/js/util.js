function getRandomIntegerInclusive(min, max) {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  if (min < 0 || max < 0) {
    return NaN;
  }
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

const getRandomArrayElement = (elements) => elements[getRandomIntegerInclusive(0, elements.length - 1)];

function getRandomIntegerFloat(min, max, precision = 5) {
  if (min < 0 || max < 0 || precision < 0) {
    return NaN;
  }
  if (min > max) {
    return getRandomIntegerFloat(max, min, precision);
  }
  return +(Math.random() * (max - min) + min).toFixed(precision);
}

const getRandomLengthArray = (arrayOriginal) => {
  const arrayLocal = Array.from(arrayOriginal);

  for (let i = 0; i < arrayLocal.length; i++) {
    const j = getRandomIntegerInclusive(0, arrayLocal.length - 1);
    const temp = arrayLocal[i];
    arrayLocal[i] = arrayLocal[j];
    arrayLocal[j] = temp;
  }
  const arrayNew = arrayLocal.slice(getRandomIntegerInclusive(0, arrayLocal.length - 1));
  return arrayNew;
};

export { getRandomIntegerInclusive };
export { getRandomIntegerFloat };
export { getRandomArrayElement };
export { getRandomLengthArray };

const ALERT_SHOW_TIME = 5000;
const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.height = '90px';
  alertContainer.style.zIndex = '999999';
  alertContainer.style.position = 'fixed';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '30px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.color = '#000';
  alertContainer.style.backgroundColor = '#ffaa99';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export { showAlert, isEscapeKey, debounce };
