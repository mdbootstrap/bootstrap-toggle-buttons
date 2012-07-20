!function ($) {
  "use strict";

  $.fn.toggleButtons = function (opt) {
    var $element, $labelEnabled, options, active, styleActive, styleDisabled;
    this.each(function () {
      $element = $(this);

      options = $.extend({}, $.fn.toggleButtons.defaults, opt);

      $element.addClass('toggle-button');

      $element.css('width', options.width);

      $labelEnabled = $('<label></label>').attr('for', $element.find('input').attr('id'));

      $element.append($labelEnabled);

      $element.attr("data-enabled", options.label.enabled === undefined ? "ON" : options.label.enabled);
      $element.attr("data-disabled", options.label.disabled === undefined ? "OFF " : options.label.disabled);

      active = $element.find('input').is(':checked');

      if (active)
        $element.addClass('active');
      else $element.addClass('disabled');

      styleActive = options.style.enabled === undefined ? "" : options.style.enabled;
      styleDisabled = options.style.disabled === undefined ? "" : options.style.disabled;

      if (active && styleActive !== undefined)
        $element.addClass(styleActive);
      if (!active && styleDisabled !== undefined)
        $element.addClass(styleDisabled);

      $element.on('click', function (e) {
        if ($(e.target).is('input'))
          return true;

        e.stopPropagation();
        $(this).find('label').click();
      });

      $element.find('label').on('click', function (e) {
        e.stopPropagation();
        $element = $(this).parent();
        $element
          .toggleClass('active')
          .toggleClass('disabled')
          .toggleClass(styleActive)
          .toggleClass(styleDisabled);

        options.onChange($element, !($element.find('input').is(':checked')), e);
      });

    });
  };

  $.fn.toggleButtons.defaults = {
    onChange: function () {
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