import { activatedOn, activatedOff } from './notice-form.js';
import { turnOn, turnOff } from './filter.js';
import { getArrayOfNoticeObjects } from './data.js';
import { renderElements } from './popup.js';

const noticeForm = document.querySelector('.ad-form');
const address = noticeForm.querySelector('#address');
const mapCanvasElements = getArrayOfNoticeObjects();
const START_COORDINATE = {
  lat: 35.68944,
  lng: 139.69171,
};

turnOff();
activatedOff();

const map = L.map('map-canvas')
  .on('load', () => {
    turnOn();
    activatedOn();
    address.value = `${START_COORDINATE.lat.toFixed(5)}, ${START_COORDINATE.lng.toFixed(5)}`;
  })
  .setView(START_COORDINATE, 12);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  START_COORDINATE,
  {
    draggable: true,
    icon: mainPinIcon,
  },
);
mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) => {
  const location = evt.target.getLatLng();
  address.value = `${location.lat.toFixed(5)}, ${location.lng.toFixed(5)}`;
});

const icon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const markerGroup = L.layerGroup().addTo(map);

const createMarker = (index) => {
  const {location:{lat, lng}} = index;
  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon,
    },
  );
  marker.addTo(markerGroup).bindPopup(renderElements(index));
};

mapCanvasElements.forEach((index) => {createMarker(index);});
