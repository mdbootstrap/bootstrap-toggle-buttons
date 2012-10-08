!function ($) {
  "use strict";

  $.fn.toggleButtons = function () {
    this.each(function () {
        var $element = $(this)
          , $div
          , $switchLeft
          , $switchRight
          , $label
          , myClasses = ""
          , classes = $element.attr('class');

        $.each(['switch-mini', 'switch-small', 'switch-large'], function (i, el) {
          if (classes.indexOf(el) >= 0) {
            myClasses = el;
            $element.removeClass(el);
          }
        });

        $switchLeft = $('<span></span>')
          .addClass("switch-left")
          .addClass(myClasses)
          .text("ON");

        $switchRight = $('<span></span>')
          .addClass("switch-right")
          .addClass(myClasses)
          .text("OFF");

        $label = $('<label></label>')
          .html("&nbsp;")
          .addClass(myClasses)
          .attr('for', $element.find('input').attr('id'));

        $div = $element.find('input').wrap($('<div></div>')).parent().addClass('switch-animate');
        $div.append($switchLeft);
        $div.append($label);
        $div.append($switchRight);

        $element.find('>div').addClass(
          $element.find('input').is(':checked') ? 'switch-on' : 'switch-off'
        );

        if ($element.find('input').is(':disabled'))
          $(this).addClass('deactivate');

        var changeStatus = function ($this) {
          $this.siblings('label').trigger('mousedown').trigger('mouseup').trigger('click');
        };

        $switchLeft.on('click', function (e) {
          changeStatus($(this));
        });
        $switchRight.on('click', function (e) {
          changeStatus($(this));
        });

        $element.find('input').on('change', function (e) {
          var $element = $(this).parent();

          e.preventDefault();
          e.stopImmediatePropagation();

          $element.css('left', '');

          if ($(this).is(':checked'))
            $element.removeClass('switch-off').addClass('switch-on');
          else $element.removeClass('switch-on').addClass('switch-off');

          $element.addClass("switch-animate");

          $element.parent().trigger('switch-change', {'el': $(this), 'value': $(this).is(':checked')})
        });

        $element.find('label').on('mousedown', function (e) {
          var $this = $(this)
            , moving = false;

          e.preventDefault();
          e.stopImmediatePropagation();

          $this.closest('div').removeClass('switch-animate');

          if ($this.closest('.switch').is('.deactivate'))
            $this.unbind('click');
          else {
            $this.on('mousemove touchmove', function (e) {
              var $element = $(this).closest('.switch')
                , percent = (((e.pageX - $element.offset().left) / $element.width()) * 100)
                , left = 25
                , right = 75;

              moving = true;

              if (percent < left)
                percent = left;
              else if (percent > right)
                percent = right;

              $element.find('>div').css('left', (percent - right) + "%")
            });

            $this.on('click', function (e) {
              var $this = $(this)
                , $target = $(e.target)
                , $myCheckBox = $target.siblings('input');

              e.stopImmediatePropagation();
              e.preventDefault();

              $this.unbind('mouseleave');

              if (moving)
                $myCheckBox.attr('checked', !(parseInt($this.parent().css('left')) < -25));
              else $myCheckBox.attr("checked", !$myCheckBox.is(":checked"));

              $myCheckBox.trigger('change');
            });

            $this.on('mouseleave', function (e) {
              var $this = $(this)
                , $myCheckBox = $this.siblings('input');

              e.preventDefault();
              e.stopImmediatePropagation();

              $this.unbind('mouseleave');
              $this.trigger('mouseup');

              $myCheckBox.attr('checked', !(parseInt($this.parent().css('left')) < -25)).trigger('change');
            });

            $this.on('mouseup', function (e) {
              e.stopImmediatePropagation();
              e.preventDefault();

              $(this).unbind('mousemove');
            });
          }
        });
      }
    );
  };
}($);

$(function () {
  $('.switch').toggleButtons();
});