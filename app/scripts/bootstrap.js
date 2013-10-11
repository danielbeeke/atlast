/*global define */
define(['twigloader'], function (twigloader) {

    var bootstrap = {
      init: function (callback) {

        // Get the last timestamp.
        var timestamp = localStorage.getItem('timestamp')

        var timestamp = null;

        $('#main').html(twigloader.get('progress', {
          percentage: 0
        }))

        if (timestamp) {
          var url = 'http://192.168.0.101/api/' + requirejs.s.contexts._.config.atlast.slug + '/' + timestamp;
        }
        else {
          var url = 'http://192.168.0.101/api/' + requirejs.s.contexts._.config.atlast.slug;
        }

        $.ajax({
          url: url,
          dataType: 'jsonp',
          jsonpCallback: 'atlastApi',
          xhrFields: {
            onprogress: function(e) {
                if (e.lengthComputable) {
                    $('#progress').html(twigloader.get('progress', {
                      percentage: Number( (e.loaded / e.total * 100))
                    }))
                }
                else {
                  console.log("Length not computable.");
                }
            }
          },
          success: function(json) {
            var currentTimestamp = Math.round(new Date().getTime() / 1000)
            localStorage.setItem('timestamp', currentTimestamp)

            $.each(json, function (key, object) {
              localStorage.setItem(key, JSON.stringify(object))
            });

            $('#main').html(twigloader.get('index'))
            var menu = JSON.parse(localStorage.getItem('menu'))
            var menuRendered = twigloader.get('menu', {menu: menu})

            var menuModal = twigloader.get('modal', {
              id: 'menu',
              content: menuRendered,
              title: 'Menu'
            })

            $('body').append(menuModal)

            Atlast = {};
            Atlast.behaviors = {};

            // Execute additional plugins.
            var plugins = JSON.parse(localStorage.getItem('js'))

            eval(plugins)

            $.each(Atlast.behaviors, function (key, behavior) {
              behavior.attach()
            });

            callback()

          }
        });
      }
    }

    return bootstrap
});
