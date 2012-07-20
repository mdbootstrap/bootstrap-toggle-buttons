!function ($) {
  "use strict";

  $.fn.toggleButtons = function (opt) {
    var $element, options, active, styleActive, styleDisabled, $labelEnabled, $span1, $span2, $spans;
    this.each(function () {
      $element = $(this);

      options = $.extend({}, $.fn.toggleButtons.defaults, opt);

      $element.addClass('toggle-button');

      $element.css('width', options.width);

      $labelEnabled = $('<label></label>').attr('for', $element.find('input').attr('id'));
      $span1 = $('<span></span>');
      $span2 = $('<span></span>');

      $element.append($labelEnabled);

//      $span.attr('data-enabled', options.label.enabled === undefined ? "MA VARA TI asd BEL MATELOT" : options.label.enabled);
//      $span.attr('data-disabled', options.label.disabled === undefined ? "TEL L " : options.label.disabled);
      $span1.html(options.label.enabled === undefined ? "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua" : options.label.enabled);
      $span2.html(options.label.disabled === undefined ? "TEL L " : options.label.disabled);

      $element.append($span1);
      $element.append($span2);

      $spans = $(".toggle-button span");

      var tmp = Math.max.apply(null, $spans.map(function () {
        return $(this).height();
      }).get())+10;

      $spans.css('min-height', tmp).css('max-height', tmp);
      $labelEnabled.css('min-height', tmp+ "!important").css('max-height', tmp + "!important");
//      }).get())+10);


//      $element.append($('<div></div>').addClass('clearfix'));


      if ($element.find('input').is(':checked')) {
        $element.addClass('active');
        $span2.hide();
      }
      else {
        $element.addClass('disabled');
        $span1.hide();
      }

      styleActive = options.style.enabled === undefined ? "" : options.style.enabled;
      styleDisabled = options.style.disabled === undefined ? "" : options.style.disabled;

      if (active && styleActive !== undefined)
        $element.addClass(styleActive);
      if (!active && styleDisabled !== undefined)
        $element.addClass(styleDisabled);

      $element.find('label').on('click', function (e) {
        $element.find('span').toggle();
        e.stopPropagation();
        $element = $(this).parent();
        $element
          .toggleClass('active')
          .toggleClass('disabled')
          .toggleClass(styleActive)
          .toggleClass(styleDisabled);

        options.onClick($element, !($element.find('input').is(':checked')), e);
      });

    });
  };

  $.fn.toggleButtons.defaults = {
    onClick: function () {
    },
    width: 200,
    label: {
      enabled: undefined,
      disabled: undefined
    },
    style: {
      enabled: undefined,
      disabled: undefined
    }
  };

}($);