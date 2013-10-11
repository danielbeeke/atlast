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

        var locations = JSON.parse(localStorage.getItem('locations'))

        // Put the locations on the map.
        $.each(locations, function (id, location) {
          L.geoJson(location.geojson, {
              onEachFeature: function (feature, layer) {
                var locationIcon = L.divIcon({
                  className: 'atlast-icon',
                  html: twigloader.get('icon', {
                    title: location.title,
                    icon: location.icon,
                  })
                });

                layer.setIcon(locationIcon)

                layer.on('click', function(e) {
                  $('#plate').plate('hide').remove()

                  $('body').append(twigloader.get('plate', {
                    title: location.title,
                    content: location.content,
                  }))

                  $('#plate').plate('show')
                });
              }
          }).addTo(atlastMap);
        });

      }
    }

    return map;
});
