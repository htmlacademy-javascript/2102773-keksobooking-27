function randomIntegerInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  if (typeof min !== 'number' || typeof max !== 'number') {
    return NaN;
  }
  if (min < 0 || max < 0 || max === min) {
    return NaN;
  }
  if (min > max) {
    return randomIntegerInclusive(max, min);
    /*const reverse = min;
    min = max;
    max = reverse;*/
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
//Максимум и минимум включаются. Источник:https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
randomIntegerInclusive(1,10);

function randomIntegerFloat(min, max, precision) {

  if (typeof min !== 'number' || typeof max !== 'number') {
    return NaN;
  }
  if (min < 0 || max < 0 || max === min) {
    return NaN;
  }
  if (max < min) {
    const reverse = min;
    min = max;
    max = reverse;
  }
  return +(Math.floor(Math.random() * (max - min + 1)) + min).toFixed(precision);
}
//Максимум и минимум включаются. Источник: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
//Метод toFixed. Источник: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed
randomIntegerFloat (1.152,10.569,1);
