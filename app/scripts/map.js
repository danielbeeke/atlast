/*global define */
define(['twigloader','leaflet'], function (twigloader, L) {
    'use strict';

    var map = {
      init: function () {
        var instance = JSON.parse(localStorage.getItem('instance'))

        console.log(instance)

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
                    color: location.color
                  })
                });

                layer.setIcon(locationIcon)

                layer.on('click', function(e) {
                  $('#plate').plate('hide').remove()

                  $('body').append(twigloader.get('plate', {
                    title: location.title,
                    content: location.content,
                    color: location.color,
                    icon: location.icon
                  }))

                  if (location.plugins) {
                    $.each(location.plugins, function (plugin, data) {
                      var pluginContent = twigloader.get(plugin, { data: data })
                      $('.plate-body').append(pluginContent)
                    });
                  }

                  $('body').trigger('plate_new_content', [location]);

                  $('#plate').plate('show')
                });
              }
          }).addTo(atlastMap);
        });

      }
    }

    return map;
});
