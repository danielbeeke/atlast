/*global define */
define(['twigloader'], function (twigloader) {

    var bootstrap = {
      init: function (callback) {

        // Check if the localstorage has a cache of the instance data.
        var cache = localStorage.getItem('cache')

        if (cache) {
          callback()
        }
        else {
          $('#progress').html(twigloader.get('progress', {
            percentage: 0
          }))

          $.ajax({
            url: '/cache.json',
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
              localStorage.setItem('cache', JSON.stringify(json))

              callback()
            }
          });
        }
      }
    }

    return bootstrap
});
