!function ($) {
  "use strict";
  // version: 1.7
  // by Mattia Larentis - follow me on twitter! @SpiritualGuru

  $.fn.toggleButtons = function (method) {
    var $element
      , $div
      , options
      , active
      , styleActive
      , styleDisabled
      , animationCss
      , transitionSpeed = 0.05
      , defaultSpeed = 0.05
      , methods = {
        init: function (opt) {
          this.each(function () {
            var $spanLeft
              , $spanRight;

            $element = $(this);

            options = $.extend({}, $.fn.toggleButtons.defaults, opt);

            $element.addClass('toggle-button');

            $spanLeft = $('<span></span>').text(options.label.enabled === undefined ? "ON" : options.label.enabled);
            $spanRight = $('<span></span>').text(options.label.disabled === undefined ? "OFF " : options.label.disabled);
            // html layout
            $div = $element.find('input').wrap($('<div></div>')).parent();
            $div.append($spanLeft);
            $div.append($('<label></label>').attr('for', $element.find('input').attr('id')));
            $div.append($spanRight);

            if (options.animated) {
//              $element.addClass('toggle-button-animated');
//
              if (options.transitionSpeed !== undefined)
                if (/^(\d*%$)/.test(options.transitionSpeed))  // is a percent value?
                  transitionSpeed = defaultSpeed * parseInt(options.transitionSpeed) / 100;
                else
                  transitionSpeed = options.transitionSpeed;

              animationCss = ["-webkit-", "-moz-", "-o-", ""];
              $(animationCss).each(function () {
                $element.find('>div').css(this + 'transition', 'all ' + transitionSpeed + 's');
              });
            }

            // size of the bootstrap-toggle-button
            $element
              .css('width', options.width * 2)
              .find('>div').css('width', options.width * 3)
              .find('>span, >label').css('width', options.width);

            active = $element.find('input').is(':checked');

            if (!active)
              $element.addClass('disabled');

            if ($element.find('input').is(':disabled'))
              $element.addClass('deactivate');

            $spanLeft.addClass(options.style.enabled === undefined ? "" : options.style.enabled)
            $spanRight.addClass(options.style.disabled === undefined ? "" : options.style.disabled)

            $element.on('click', function (e) {
              if ($(e.target).is('input'))
                return true;

              e.stopPropagation();

              $(this).find('label').click();
            });

            var mainClickFunction = function (e) {
              e.stopPropagation();
              e.preventDefault();
              console.log('click2')

              $element = $(this).closest('.toggle-button');

              if ($element.is('.deactivate'))
                return true;


              $element.find('>div').toggleClass('disabled')

//              $element
//                .queue(function () {
//                    .toggleClass(styleActive)
//                    .toggleClass(styleDisabled)
//                    .dequeue();
//                });

              active = !($element.find('input').is(':checked'));

              $element.find('input').attr('checked', active);
              options.onChange($element, active, e);
            };

            $element.find('input').on('change', function (e) {
              e.stopPropagation();
              e.preventDefault();

              $(this).closest('.toggle-button').toggleButtons("toggleState", true);
            });

            $element.find('label').on('mousedown', function (e) {
              e.stopPropagation();
              e.preventDefault();
              $(this).unbind('click');
//
              $(this).on('mousemove', function (e) {
                var relativeX = e.pageX - $(this).closest('.toggle-button').offset().left;
//                console.log(relativeX)
                var percent = (relativeX / (options.width * 2)) * 100;
//                console.log(percent)
                if (percent < 16)
                  percent = 16;
                else if (percent > 67)
                  percent = 67;
//
//                console.log(percent)
                $element.find('>div').css('left', percent-(200/3) + "%")
              });

              $(this).on('mouseleave', function() {
                var $div = $element.find('>div');
                $(this).unbind('mousemove');

                if (parseInt($div.css('left')) < -25)
                  $div.css('left', "-50%");
                else $div.css('left', "0");

              });
//
              $(this).bind('click', function () {
                console.log('click');
                $(this).unbind('click');
                $(this).bind('click', mainClickFunction);
                $(this).click();
                return false;
              });
            });

            $element.find('label').on('click', mainClickFunction);
          });
        },
        toggleActivation: function () {
          $(this).toggleClass('deactivate');
        },
        toggleState: function (clickOnAnotherLabel) {
          if (clickOnAnotherLabel !== undefined)
            $(this).toggleClass('disabled');
          else
            $(this).find('label').click();
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