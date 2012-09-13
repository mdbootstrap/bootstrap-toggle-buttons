!function ($) {
  "use strict";
  // version: 2.0
  // by Mattia Larentis - follow me on twitter! @SpiritualGuru

  $.fn.toggleButtons = function (method) {
    var $element
      , $div
      , transitionSpeed = 0.05
      , methods = {
        init: function (opt) {
          this.each(function () {
            var $spanLeft
              , $spanRight
              , options;

            $element = $(this);
            $element.addClass('toggle-button');

            options = $.extend({}, $.fn.toggleButtons.defaults, opt);
            $(this).data('options', options);

            $spanLeft = $('<span></span>').addClass("labelLeft").text(options.label.enabled === undefined ? "ON" : options.label.enabled);
            $spanRight = $('<span></span>').addClass("labelRight").text(options.label.disabled === undefined ? "OFF " : options.label.disabled);

            // html layout
            $div = $element.find('input').wrap($('<div></div>')).parent();
            $div.append($spanLeft);
            $div.append($('<label></label>').attr('for', $element.find('input').attr('id')));
            $div.append($spanRight);

            if ($element.find('input').is(':checked'))
              $element.find('>div').css('left', "0");
            else $element.find('>div').css('left', "-50%");

            if (options.animated) {
              if (options.transitionSpeed !== undefined)
                if (/^(\d*%$)/.test(options.transitionSpeed))  // is a percent value?
                  transitionSpeed = 0.05 * parseInt(options.transitionSpeed) / 100;
                else
                  transitionSpeed = options.transitionSpeed;
            }
            else transitionSpeed = 0;

            $(this).data('transitionSpeed', transitionSpeed * 1000);


            options["width"] /= 2;

            // size of the bootstrap-toggle-button
            $element
              .css('width', options.width * 2)
              .find('>div').css('width', options.width * 3)
              .find('>span, >label').css('width', options.width);

            if ($element.find('input').is(':disabled'))
              $(this).addClass('deactivate');

            $spanLeft.addClass(options.style.enabled === undefined ? "" : options.style.enabled)
            $spanRight.addClass(options.style.disabled === undefined ? "" : options.style.disabled)


            var changeStatus = function ($this) {
              $this.siblings('label').trigger('mousedown').trigger('mouseup').trigger('click');
            };

            $spanLeft.on('click', function (e) {
              changeStatus($(this));
            });
            $spanRight.on('click', function (e) {
              changeStatus($(this));
            });

            $('.toggle-button').find('input').on('change', function (e) {
              var $element = $(this).parent()
                , active = $(this).is(':checked')
                , $toggleButton = $(this).closest('.toggle-button');

              e.preventDefault();
              e.stopImmediatePropagation();

              $element.animate({'left': active ? '0' : '-50%'}, $toggleButton.data('transitionSpeed'));

              options = $toggleButton.data('options');
              options.onChange($element, active, e);
            });

            $('.toggle-button').find('label').on('mousedown', function (e) {
              e.preventDefault();
              e.stopImmediatePropagation();

              if (!$(this).closest('.toggle-button').is('.deactivate')) {

                $(this).on('mousemove', function (e) {
                  var $element = $(this).closest('.toggle-button')
                    , relativeX = e.pageX - $element.offset().left
                    , percent = ((relativeX / (options.width * 2)) * 100);

                  if (percent < 25)
                    percent = 25;
                  else if (percent > 75)
                    percent = 75;

                  $element.find('>div').css('left', (percent - 75) + "%")
                });

                $(this).on('click', function (e) {
                  var $target = $(e.target)
                    , $input = $target.siblings('input');

                  e.stopImmediatePropagation();
                  e.preventDefault();
                  $(this).unbind('mouseleave');

                  $input.attr('checked', !($input.is(':checked'))).trigger('change');
                });

                $(this).on('mouseleave', function (e) {
                  var $myCheckBox = $(this).siblings('input');

                  e.preventDefault();
                  e.stopImmediatePropagation();

                  $(this).unbind('mouseleave');
                  $(this).trigger('mouseup');

                  if (parseInt($(this).parent().css('left')) < -25)
                    $myCheckBox.attr('checked', false);
                  else $myCheckBox.attr('checked', true);

                  $myCheckBox.trigger('change');
                });

                $(this).on('mouseup', function (e) {
                  e.stopImmediatePropagation();
                  e.preventDefault();
                  $(this).unbind('mousemove');
                });
              }
            });
          });
        },
        toggleActivation: function () {
          $(this).toggleClass('deactivate');
        }
      };

    if (methods[method])
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    else if (typeof method === 'object' || !method)
      return methods.init.apply(this, arguments);
    else
      $.error('Method ' + method + ' does not exist on jQuery.tooltip');
  };

  $.fn.toggleButtons.defaults = {
    onChange: function () {
    },
    width: 100,
    animated: true,
    transitionSpeed: undefined,
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