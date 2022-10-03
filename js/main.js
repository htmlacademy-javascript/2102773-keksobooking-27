function getRandomIntegerInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  if (min < 0 || max < 0) {
    return NaN;
  }
  if (min > max) {
    return getRandomIntegerInclusive(max, min);
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

getRandomIntegerInclusive(1,10);

function getRandomIntegerFloat(min, max, precision = 1) {

  if (min < 0 || max < 0) {
    return NaN;
  }
  if (min > max) {
    return getRandomIntegerFloat(max, min);
  }
  return +(Math.floor(Math.random() * (max - min + 1)) + min).toFixed(precision);
}

getRandomIntegerFloat(1.152,10.569,2);
