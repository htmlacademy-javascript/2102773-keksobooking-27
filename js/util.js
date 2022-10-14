function getRandomIntegerInclusive(min, max) {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  if (min < 0 || max < 0) {
    return NaN;
  }
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}
export { getRandomIntegerInclusive };

const getRandomArrayElement = (elements) => elements[getRandomIntegerInclusive(0, elements.length - 1)];
export { getRandomArrayElement };

function getRandomIntegerFloat(min, max, precision = 5) {
  if (min < 0 || max < 0 || precision < 0) {
    return NaN;
  }
  if (min > max) {
    return getRandomIntegerFloat(max, min, precision);
  }
  return +(Math.random() * (max - min) + min).toFixed(precision);
}
export { getRandomIntegerFloat };

const getRandomLengthArray = (arrayOriginal) => {
  const arrLocal = Array.from(arrayOriginal);
  const newArray = new Array(getRandomIntegerInclusive(1, arrLocal.length));

  for (let i = 0; i < newArray.length; i++) {
    newArray[i] = arrLocal.splice(getRandomIntegerInclusive(0, arrLocal.length - 1), 1).join();
  }
  return newArray;
};
export { getRandomLengthArray };

