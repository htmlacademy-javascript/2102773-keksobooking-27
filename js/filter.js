const filterElement = document.querySelector('.map__filters');
const deactivate = () => {
  filterElement.classList.add('map__filters--disabled');
  for (const filter of filterElement.children) {
    filter.disabled = true;
  }
};

const activate = () => {
  filterElement.classList.remove('map__filters--disabled');
  for (const filter of filterElement.children) {
    filter.disabled = false;
  }
};
export { deactivate, activate };
