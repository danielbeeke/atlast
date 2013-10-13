/*global define */
define(['jquery', 'twigloader'], function ($, twigloader) {
    'use strict';

    var combiner = {
      hideMenu: function () {
        $('#menu').modal('hide')
      },
      showPlate: function(data) {
        var time = 0
        if ($('.plate:visible').length) { time = 400 }
        $('.plate').plate('hide')

        setTimeout(function () {
          if (!$('#' + data.id).length) {
            $('body').append(twigloader.get('plate', data))
          }
          $('#' + data.id).plate('show')
        }, time)
      }
    }

    return combiner;
});
