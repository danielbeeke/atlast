/*global define */
define(['twigloader','leaflet'], function (twigloader, L) {
    'use strict';

    var map = {
      init: function () {
        var instance = JSON.parse(localStorage.getItem('instance'))

        var atlastMap = L.map('map', {
          attributionControl: false,
          zoomControl: false,
          maxBounds: [instance.mapBounds.topLeft, instance.mapBounds.bottomRight]
        }).setView([51.505, -0.09], 13);

        L.tileLayer(instance.mapUrl, {
            maxZoom: 18
        }).addTo(atlastMap);
      }
    }

    return map;
});
