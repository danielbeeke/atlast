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
          var url = 'http://atlast.dev/api/' + requirejs.s.contexts._.config.atlast.slug + '/' + timestamp;
        }
        else {
          var url = 'http://atlast.dev/api/' + requirejs.s.contexts._.config.atlast.slug;
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
            localStorage.setItem('cache', JSON.stringify(json))

            $('#main').html(twigloader.get('index'))

            callback()

          }
        });
      }
    }

    return bootstrap
});
