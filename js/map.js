import { renderElements } from './popup.js';
import { getData } from './api.js';

const OFFERS_COUNT = 10;
const START_COORDINATE = {
  lat: 35.66023,
  lng: 139.73007,
};

const noticeForm = document.querySelector('.ad-form');
const address = noticeForm.querySelector('#address');

const map = L.map('map-canvas');
const markerGroup = L.layerGroup().addTo(map);

const setAddress = (coordinate) => {
  address.value = `${coordinate.lat.toFixed(5)}, ${coordinate.lng.toFixed(5)}`;
};

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const icon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const mainPinMarker = L.marker(
  {
    lat: 0,
    lng: 0,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const initMap = (coordinate) => {
  map.setView(coordinate, 12);
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
  mainPinMarker.setLatLng(coordinate);
  mainPinMarker.addTo(map);
};

const createMarker = (offers) => {
  offers.forEach((offer) => {
    const {location:{lat, lng}} = offer;
    const marker = L.marker(
      {
        lat,
        lng,
      },
      {
        icon,
      },
    );
    marker.addTo(markerGroup).bindPopup(renderElements(offer));

    const closePopup = () => {
      marker.closePopup();
    };

    noticeForm.addEventListener('submit', () => {
      closePopup();
    });

    noticeForm.addEventListener('reset', () => {
      closePopup();
    });
  });
};

const setMarker = (offers) => {
  markerGroup.clearLayers();
  createMarker(offers.slice(0, OFFERS_COUNT));
};

const setOnMainPin = (cb) => {
  mainPinMarker.on('moveend', (evt) => cb(evt.target.getLatLng()));
};

const setOnMapLoad = (cb) => {
  map.on('load', cb);
};

getData ((offers) => {
  createMarker(offers);
});

const markerReset = (coordinate) => {
  mainPinMarker.setLatLng(coordinate);
};

export { initMap, setOnMapLoad, setOnMainPin, setMarker, setAddress, markerReset, START_COORDINATE };

