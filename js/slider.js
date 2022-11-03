const sliderElement = document.querySelector('.ad-form__slider');
const priceElement = document.querySelector('#price');

const onPriceChange = () => {
  sliderElement.noUiSlider.set(priceElement.value);
};

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100000,
  },
  start: 0,
  step: 100,
  connect: 'lower',
  format: {
    to: function (value) {
      return value.toFixed(0);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

sliderElement.noUiSlider.on('slide', () => {
  priceElement.value = sliderElement.noUiSlider.get();
});

priceElement.addEventListener('change', onPriceChange);

export { onPriceChange };
