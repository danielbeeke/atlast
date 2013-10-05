/*global define */
define([], function () {
    'use strict';

var map = L.map('map', {
  attributionControl: false,
  zoomControl: false
}).setView([51.505, -0.09], 13);

L.tileLayer('http://{s}.tile.cloudmade.com/d4fc77ea4a63471cab2423e66626cbb6/997/256/{z}/{x}/{y}.png', {
    maxZoom: 18
}).addTo(map);

    return '\'Allo \'Allo!';
});
