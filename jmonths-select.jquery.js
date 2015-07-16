/*jslint browser: true, indent: 2, */
/*global jQuery*/

(function ($) {
  'use strict';

  $.fn.months_selector = function (options, arg) {
    var $this, $field, today, update_selection, months, year, month, cls, m, settings;

    $this = this;

    update_selection = function ($field) {
      var mon = [];
      $this.find('.month.selected').each(function () {
        mon.push($(this).data('month'));
      });
      $field.val(mon.join(','));
      return mon;
    };

    if (options && typeof options === 'object') {
      // Default settings
      today = new Date();
      settings = $.extend({
        months: today.getMonth() + 1,
        start_year: today.getFullYear(),
        start_month: today.getMonth() + 1,
        field: 'months',
        special: []
      }, options);

      // Hidden field to store the list of months
      $field = $("<input type='hidden' name='" + settings.field + "'/>");
      $this.append($field);

      // Widget generation
      months = [];
      year = settings.start_year;
      month = settings.start_month;
      cls = 'month';
      for (m = settings.months; m > 0; m -= 1) {
        if (settings.special.indexOf(year + '-' + month) >= 0) {
          cls = 'month special';
        } else {
          cls = 'month';
        }
        months.push(
          "<li class='" + cls + "' data-month='" + year + "-" + ('0' + month).slice(-2) + "'>" +
            ('0' + month).slice(-2) +
            "</li>"
        );
        if (month === 1 || m === 1) {
          $this.append(
            "<ul class='year'><li class='year-label'>" + year + "</li>" + months.join('') + "</ul>"
          );
          months = [];
          month = 12;
          year -= 1;
        } else {
          month -= 1;
        }
      }


      $this.find('.month').click(function () {
        $(this).toggleClass('selected');
        update_selection($field);
        $field.change();
      });

      $this.find('.year-label').click(function () {
        $(this).siblings().each(function () {
          $(this).toggleClass('selected');
        });
        update_selection($field);
        $field.change();
      });
      return $this;
    }
    if (options && typeof options === 'string') {
      if (options === 'setSelection') {
        $this.find('.month').each(function () {
          var $month, mon;
          $month = $(this);
          mon = $month.data('month');
          if (arg.indexOf(mon) >= 0) {
            $month.addClass('selected');
          } else {
            $month.removeClass('selected');
          }
        });
        return update_selection($this.find('input:hidden'));
      }
    }
  };
}(jQuery));
