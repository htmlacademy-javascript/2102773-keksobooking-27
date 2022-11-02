const filterElement = document.querySelector('.map__filters');
const turnFilterOff = () => {
  filterElement.classList.add('map__filters--disabled');
  for (const filter of filterElement.children) {
    filter.disabled = true;
  }
};

const turnFilterOn = () => {
  filterElement.classList.remove('map__filters--disabled');
  for (const filter of filterElement.children) {
    filter.disabled = false;
  }
};

export { turnFilterOff, turnFilterOn };
