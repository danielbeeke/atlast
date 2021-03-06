/*global define */
define(['twigloader','leaflet', 'combiner'], function (twigloader, L, combiner) {
    'use strict';

    var map = {
      init: function () {
        // Get the instance data, map url etc.
        var instance = JSON.parse(localStorage.getItem('instance'))

        // Init the leaflet map.
        var atlastMap = L.map('map', {
          attributionControl: false,
          zoomControl: false,
          maxBounds: [instance.mapBounds.topLeft, instance.mapBounds.bottomRight]
        }).setView([51.505, -0.09], 13);

        // Attach the tile layer.
        L.tileLayer(instance.mapUrl, {
            maxZoom: 18
        }).addTo(atlastMap);

        // Get all locations from the local storage.
        var locations = JSON.parse(localStorage.getItem('locations'))

        var totalBounds = new L.LatLngBounds()

        // Put the locations on the map.
        $.each(locations, function (id, location) {
          L.geoJson(location.geojson, {

              // Style each feature with a nice marker.
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

                // Click handler for markers.
                layer.on('click', function(e) {
                  var content = location.content

                  // Attach plugins.
                  // These plugins define javascript on the serverside.
                  // However twig templates are loaded still packaged in the app.
                  if (location.plugins) {
                    $.each(location.plugins, function (plugin, data) {
                      var pluginContent = twigloader.get(plugin, { data: data })
                      content = content + pluginContent
                    });
                  }

                  combiner.showPlate({
                    id: 'location-' + location.id,
                    title: location.title,
                    content: content,
                    color: location.color,
                    icon: location.icon
                  }, function () {
                    // Let those js plugins attach to our trigger.
                    $('body').trigger('plate_new_content', [$('#location-' + location.id), location]);
                  })
                });

                // Add the current marker to the total bounds.
                totalBounds.extend(layer._latlng)
              }
          }).addTo(atlastMap);
        });

        // Fit to all map markers on load.
        atlastMap.fitBounds(totalBounds)
      }
    }

    return map;
});
