!function ($) {
  "use strict";
  // version: 2.3
  // by Mattia Larentis - follow me on twitter! @SpiritualGuru

  var addToAttribute = function (obj, array, value) {
    for (var i = 0, length = array.length; i < length; i++) {
      obj = obj[array[i]] = obj[array[i]] || i == ( length - 1) ? value : {}
    }
  };

  $.fn.toggleButtons = function (method) {
    var $element
      , $div
      , methods = {
        init: function (opt) {
          this.each(function () {
              var $spanLeft
                , $spanRight
                , $label
                , options
                , moving
                , myClasses = "";

              $element = $(this);

              var classes = $element.attr('class');

              $.each(['switch-small', 'switch-large'], function (i, el) {
                if (classes.indexOf(el) >= 0) {
                  myClasses = el;
                  $element.removeClass(el);
                }
              });

              console.log("====>", classes, "===", myClasses, $element)

              $spanLeft = $('<span></span>')
                .addClass("labelLeft")
                .addClass(myClasses)
                .text("ON");

              $spanRight = $('<span></span>')
                .addClass("labelRight")
                .addClass(myClasses)
                .text("OFF");

              $label = $('<label></label>')
                .html("&nbsp;")
                .addClass(myClasses)
                .attr('for', $element.find('input').attr('id'))


              // html layout
              $div = $element.find('input').wrap($('<div></div>')).parent();
              $div.append($spanLeft);
              $div.append($label);
              $div.append($spanRight);

//              if ($element.find('input').is(':checked'))
//                $element.find('>div').css('left', "0");
//              else $element.find('>div').css('left', "-46%");

//              if (options.animated) {
//                if (options.transitionspeed !== undefined)
//                  if (/^(\d*%$)/.test(options.transitionspeed))  // is a percent value?
//                    transitionSpeed = 0.05 * parseInt(options.transitionspeed) / 100;
//                  else
//                    transitionSpeed = options.transitionspeed;
//              }
//              else transitionSpeed = 0;
//
//              $(this).data('transitionSpeed', transitionSpeed * 1000);

              if ($element.find('input').is(':disabled'))
                $(this).addClass('deactivate');

//              $element.find('span').css(options.font);


              // enabled custom color
//              if (options.style.enabled === undefined) {
//                if (options.style.custom !== undefined && options.style.custom.enabled !== undefined && options.style.custom.enabled.background !== undefined) {
//                  $spanLeft.css('color', options.style.custom.enabled.color);
//                  if (options.style.custom.enabled.gradient === undefined)
//                    $spanLeft.css('background', options.style.custom.enabled.background);
//                  else $.each(["-webkit-", "-moz-", "-o-", ""], function (i, el) {
//                    $spanLeft.css('background-image', el + 'linear-gradient(top, ' + options.style.custom.enabled.background + ',' + options.style.custom.enabled.gradient + ')');
//                  });
//                }
//              }
//              else $spanLeft.addClass(options.style.enabled);

              // disabled custom color
//              if (options.style.disabled === undefined) {
//                if (options.style.custom !== undefined && options.style.custom.disabled !== undefined && options.style.custom.disabled.background !== undefined) {
//                  $spanRight.css('color', options.style.custom.disabled.color);
//                  if (options.style.custom.disabled.gradient === undefined)
//                    $spanRight.css('background', options.style.custom.disabled.background);
//                  else $.each(["-webkit-", "-moz-", "-o-", ""], function (i, el) {
//                    $spanRight.css('background-image', el + 'linear-gradient(top, ' + options.style.custom.disabled.background + ',' + options.style.custom.disabled.gradient + ')');
//                  });
//                }
//              }
//              else $spanRight.addClass(options.style.disabled);

              var changeStatus = function ($this) {
                $this.siblings('label').trigger('mousedown').trigger('mouseup').trigger('click');
              };

              $spanLeft.on('click', function (e) {
                changeStatus($(this));
              });
              $spanRight.on('click', function (e) {
                changeStatus($(this));
              });

              $element.find('input').on('change', function (e) {
                var $element = $(this).parent()
                  , active = $(this).is(':checked')
                  , $toggleButton = $(this).closest('.toggle-button');

                e.preventDefault();
                e.stopImmediatePropagation();

                if (active)
                  $element.removeClass('btn-off').addClass('btn-on');
                else $element.removeClass('btn-on').addClass('btn-off');

//                $element.stop().animate({'left': active ? '0' : '-46%'}, $toggleButton.data('transitionSpeed'));

//                options = $toggleButton.data('options');
//                options.onChange($element, active, e);
              });

              $element.find('label').on('mousedown', function (e) {
                moving = false;

                e.preventDefault();
                e.stopImmediatePropagation();

                if ($(this).closest('.toggle-button').is('.deactivate'))
                  $(this).unbind('click');
                else {
                  $(this).on('mousemove', function (e) {
                    var $element = $(this).closest('.switch')
                      , relativeX = e.pageX - $element.offset().left
//                    console.log(e.pageX - $element.offset().left)
                      , percent = relativeX-25;

                    console.log(percent)
                    moving = true;

                    if (percent < 25)
                      percent = 25;
                    else if (percent > 75)
                      percent = 75;

                    $element.find('>div').css('left', (percent - 75) + "%")
                  });

                  $(this).on('click', function (e) {
                    var $target = $(e.target)
                      , $myCheckBox = $target.siblings('input');

                    e.stopImmediatePropagation();
                    e.preventDefault();
                    $(this).unbind('mouseleave');

                    if (moving)
                      if (parseInt($(this).parent().css('left')) < -25)
                        $myCheckBox.attr('checked', false);
                      else $myCheckBox.attr('checked', true);
                    else $myCheckBox.attr("checked", !$myCheckBox.is(":checked"));

                    $myCheckBox.trigger('change');
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
            }
          )
          ;
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
//    width: 100,
//    height: 25,
    font: {},
    animated: true,
//    transitionspeed: undefined,
    label: {
      enabled: undefined,
      disabled: undefined
    },
    style: {
      enabled: undefined,
      disabled: undefined,
      custom: {
        enabled: {
          background: undefined,
          gradient: undefined,
          color: "#FFFFFF"
        },
        disabled: {
          background: undefined,
          gradient: undefined,
          color: "#FFFFFF"
        }
      }
    }
  };
}($);
