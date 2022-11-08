import { turnOff, turnOn} from './filter.js';
import { setSubmit, setReset, toggleOff, toggleOn } from './notice-form.js';
import { initMap, setOnMapLoad, setOnMainPin, setMarker, setAddress, markerReset, START_COORDINATE } from './map.js';
import { openSuccessMessage } from './message-popup.js';
import { getData } from './api.js';

setOnMapLoad(() => {
  setOnMainPin(setAddress);
  setAddress(START_COORDINATE);
  toggleOn();
  getData((offers) => setMarker(offers));
  turnOn();
});

turnOff();
toggleOff();
initMap(START_COORDINATE);

setSubmit(() => {
  openSuccessMessage();
  markerReset(START_COORDINATE);
  setAddress(START_COORDINATE);
});

setReset();
