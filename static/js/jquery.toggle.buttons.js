!function ($) {
  "use strict";

  $.fn.toggleButtons = function (opt) {
    var $element, options, active, styleActive, styleDisabled;
    this.each(function () {
      $element = $(this);

      options = $.extend({}, $.fn.toggleButtons.defaults, opt);

      $element.addClass('toggle-button');

      //base css style
      $element.css('width', options.width);
      $element.find('label').css('width', parseInt(options.width)/2);
      $element.find('input[type=checkbox]:checked + label').css('left', parseInt(options.width)/2);
      $element.filter('.disabled:before').css('padding-left', parseInt(options.width)/3)


      if(options.small === true)
        $element.addClass('toggle-button-small');

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
    width: '200px',
    small: false,
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