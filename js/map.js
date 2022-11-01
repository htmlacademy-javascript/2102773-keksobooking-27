import { turnAdFormOn, turnAdFormOff } from './notice-form.js';
import { turnFilterOn, turnFilterOff } from './filter.js';
import { getArrayOfNoticeObjects } from './data.js';
import { renderPopupElements } from './popup.js';

turnAdFormOff();
turnFilterOff();

const noticeForm = document.querySelector('.ad-form');
const address = noticeForm.querySelector('#address');
const resetButton = document.querySelector('.ad-form__reset');
const mapCanvasElements = getArrayOfNoticeObjects();


const map = L.map('map-canvas')
  .on('load', () => {
    turnAdFormOn();
    turnFilterOn();
  })
  .setView({
    lat: 35.68944,
    lng: 139.69171,
  }, 12);

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
  {
    lat: 35.68944,
    lng: 139.69171,
  },
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
  marker.addTo(markerGroup).bindPopup(renderPopupElements(index));

  resetButton.addEventListener('click', () => {
    mainPinMarker.setLatLng({
      lat: 35.68944,
      lng: 139.69171,
    });
    marker.closePopup(renderPopupElements(index));
  });

};

mapCanvasElements.forEach((index) => {createMarker(index);
});
