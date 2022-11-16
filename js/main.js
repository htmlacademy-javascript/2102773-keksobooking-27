import * as filter from './filter.js';
import * as form from './notice-form.js';
import { initMap, setOnMapLoad, setOnMainPin, setMarker, setAddress, resetMainPin, START_COORDINATE } from './map.js';
import { openSuccessMessage } from './message-popup.js';
import { getData } from './api.js';
import { debounce } from './util.js';

const TIMEOUT_DELAY = 500;

form.disable();
filter.deactivate();
setAddress(START_COORDINATE);
setOnMainPin(setAddress);

setOnMapLoad(() => {
  form.enable();
  getData((offers) => {
    filter.getFilteredOffers(offers);
    setMarker(offers);
    filter.setOnFilterChange(debounce(() => setMarker(filter.getFilteredOffers(offers)), TIMEOUT_DELAY));
    filter.activate();
  });
});

initMap(START_COORDINATE);

form.submit(() => {
  openSuccessMessage();
  resetMainPin(START_COORDINATE);
  setAddress(START_COORDINATE);
  getData((offers) => setMarker(offers));
});

form.reset(() => {
  resetMainPin(START_COORDINATE);
  setAddress(START_COORDINATE);
  getData((offers) => setMarker(offers));
});

form.changeAvatar();
form.changePhoto();

