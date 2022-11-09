import * as filter from './filter.js';
import * as form from './notice-form.js';
import { initMap, setOnMapLoad, setOnMainPin, setMarker, setAddress, markerReset, START_COORDINATE } from './map.js';
import { openSuccessMessage } from './message-popup.js';
import { getData } from './api.js';

setOnMapLoad(() => {
  setOnMainPin(setAddress);
  setAddress(START_COORDINATE);
  form.enable();
  getData((offers) => setMarker(offers));
  filter.activate();
});

filter.deactivate();
form.disable();
initMap(START_COORDINATE);

form.submit(() => {
  openSuccessMessage();
  markerReset(START_COORDINATE);
  setAddress(START_COORDINATE);
});

form.reset();
