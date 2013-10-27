/* ========================================================================
 * Bootstrap: plate.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#plates
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // plate CLASS DEFINITION
  // ======================

  var plate = function (element, options) {
    this.options   = options
    this.$element  = $(element)
    this.isShown   = null
    this.isExpanded   = null

    if (this.options.remote) this.$element.load(this.options.remote)
  }

  plate.DEFAULTS = {
    keyboard: true,
    show: true
  }

  plate.prototype.toggle = function (_relatedTarget) {
    return this[!this.isShown ? 'show' : 'hide'](_relatedTarget)
  }

  plate.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.plate', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.escape()
    this.watchTop()

    this.$element.on('click.dismiss.plate', '[data-dismiss="plate"]', $.proxy(this.hide, this))
    this.$element.on('click.resize.plate', '[data-resize="plate"]', $.proxy(this.resize, this))

    var transition = $.support.transition && that.$element.hasClass('fade')

    if (!that.$element.parent().length) {
      that.$element.appendTo(document.body) // don't move plates dom position
    }

    $(window).scrollTop(0)

    that.$element.show()


    if (transition) {
      that.$element[0].offsetWidth // force reflow
    }

    that.$element
      .addClass('in')
      .attr('aria-hidden', false)

    that.enforceFocus()

    var e = $.Event('shown.bs.plate', { relatedTarget: _relatedTarget })

    this.position()

    transition ?
      that.$element.find('.plate-dialog') // wait for plate to slide in
        .one($.support.transition.end, function () {
          that.$element.focus().trigger(e)
        })
        .emulateTransitionEnd(300) :
      that.$element.focus().trigger(e)

  }

  plate.prototype.hide = function (e) {
    if (e) e.preventDefault()

    $('html, body').animate({ scrollTop: "0px" });

    e = $.Event('hide.bs.plate')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()
    this.watchTop()

    $(document).off('focusin.bs.plate')

    this.$element
      .removeClass('in')
      .attr('aria-hidden', true)
      .off('click.dismiss.plate')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one($.support.transition.end, $.proxy(this.hideplate, this))
        .emulateTransitionEnd(300) :
      this.hideplate(function () {
        callback()
      })
  }

  plate.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.plate') // guard against infinite focus loop
      .on('focusin.bs.plate', $.proxy(function (e) {
        if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
          this.$element.focus()
        }
      }, this))
  }

  plate.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keyup.dismiss.bs.plate', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keyup.dismiss.bs.plate')
    }
  }

  // plate.prototype.resize = function () {
  //   if (this.isExpanded) {
  //     $('html, body').animate({ scrollTop: "0px" });
  //   }
  //   else {
  //     var pixelsToScroll = parseInt($('.plate-dialog', this.$element).css('margin-top'))
  //     $('html, body').animate({ scrollTop: pixelsToScroll + "px" });
  //   }

  //   return false;
  // }

  plate.prototype.watchTop = function () {
    var that = this;
    if (this.isShown) {
      $(window).on('scroll resize', $.proxy(function (e) {
        this.position()
      }, this))

    } else if (!this.isShown) {
      $(window).off('scroll resize')
    }
  }

  plate.prototype.position = function () {
    var that = this
    var windowMinusPlateHeader = $(window).height() - $('.plate-header', that.$element).outerHeight()
    $('.plate-dialog', that.$element).css('margin-top', windowMinusPlateHeader)

    var plateMarginTop = parseInt($('.plate-dialog', this.$element).css('margin-top'))

    if($(window).scrollTop() >= plateMarginTop) {
      this.isExpanded = true
      this.$element.addClass('plate-sticky-header')
      this.$element.find('.plate-content').css('padding-top', $('.plate-header', that.$element).outerHeight())
    }
    else {
      this.isExpanded = false
      this.$element.removeClass('plate-sticky-header')
      this.$element.find('.plate-content').css('padding-top', 0)
    }
  }

  plate.prototype.hideplate = function () {
    var that = this
    this.$element.hide()
    this.$element.removeClass('plate-sticky-header')
    this.$element.find('.plate-content').css('padding-top', 0)
    this.$element.trigger('hidden.bs.plate')
  }


  // plate PLUGIN DEFINITION
  // =======================

  var old = $.fn.plate

  $.fn.plate = function (option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.plate')
      var options = $.extend({}, plate.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.plate', (data = new plate(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  $.fn.plate.Constructor = plate


  // plate NO CONFLICT
  // =================

  $.fn.plate.noConflict = function () {
    $.fn.plate = old
    return this
  }


  // plate DATA-API
  // ==============

  $(document).on('click.bs.plate.data-api', '[data-toggle="plate"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) //strip for ie7
    var option  = $target.data('plate') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    e.preventDefault()

    $target
      .plate(option, this)
      .one('hide', function () {
        $this.is(':visible') && $this.focus()
      })
  })

  $(document)
    .on('show.bs.plate',  '.plate', function () { $(document.body).addClass('plate-open') })
    .on('hidden.bs.plate', '.plate', function () { $(document.body).removeClass('plate-open') })

}(window.jQuery);
