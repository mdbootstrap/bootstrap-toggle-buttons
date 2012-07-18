!function ($) {
  "use strict";

  $.fn.toggleButtons = function (opt) {
    var $element, options, active, styleActive, styleDisabled;
    this.each(function () {
      $element = $(this);

      $element.addClass('toggle-button');

      options = $.extend({}, $.fn.toggleButtons.defaults, opt);

      $element.attr('data-enabled', options.label.enabled === undefined ? "ON" : options.label.enabled);
      $element.attr('data-disabled', options.label.disabled === undefined ? "OFF" : options.label.disabled);

      active = $element.find('input:checked').length === 1;
      if (active)
        $element.addClass('active');
      else $element.addClass('disabled');

      styleActive = options.style.enabled === undefined ? "" : options.style.enabled;
      styleDisabled = options.style.disabled === undefined ? "" : options.style.disabled;

      if (active && styleActive !== undefined)
        $element.addClass(styleActive);
      if (!active && styleDisabled !== undefined)
        $element.addClass(styleDisabled);

      $element.find('label').html('');

      $element.find('label').on('click', function (e) {
        e.stopPropagation();
        $element = $(this).parent();
        $element
          .toggleClass('active')
          .toggleClass('disabled')
          .toggleClass(styleActive)
          .toggleClass(styleDisabled);

        options.onClick($element, !$element.find('input').is(':checked'), e);
      });

    });
  };

  $.fn.toggleButtons.defaults = {
    onClick: function () {
    },
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