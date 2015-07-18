/*jslint browser: true, indent: 2, newcap: true*/
/*global Polymer*/

(function () {
  'use strict';
  var today = new Date(), forEach, reduce, update_selection;

  forEach = Function.prototype.call.bind(Array.prototype.forEach);
  reduce = Function.prototype.call.bind(Array.prototype.reduce);

  update_selection = function (months) {
    return reduce(months, function (active, month) {
      if (month.active) {
        active.push(month.getAttribute('data-month'));
      }
      return active;
    }, []);
  };

  Polymer({
    is : 'months-selector',

    properties : {
      months : {
        type : Number,
        value : today.getMonth() + 1,
        observer : 'draw'
      },
      startYear : {
        type : Number,
        value : today.getFullYear(),
        observer : 'draw'
      },
      startMonth : {
        type : Number,
        value : today.getMonth() + 1,
        observer : 'draw'
      },
      selection : {
        type : Array,
        value : function () {
          return [];
        },
        observer : 'setSelection'
      },
      special : {
        type : Array,
        value : function () {
          return [];
        }
      }
    },

    ready : function () {
      this.draw();
    },

    draw : function () {
      var m, months, year, month, cls, all_months, that = this;

      // The element is not fully created yet.
      if (!this.selection) {
        return;
      }

      months = [];
      year = this.startYear;
      month = this.startMonth;
      cls = 'month';
      this.$.container.innerHTML = '';

      for (m = this.months; m > 0; m -= 1) {
        if (this.special.indexOf(year + '-' + month) >= 0) {
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
          this.$.container.innerHTML +=
            '<ul class="year"><li class="year-label">' + year + "</li>" + months.join('') + "</ul>";
          months = [];
          month = 12;
          year -= 1;
        } else {
          month -= 1;
        }
      }

      all_months = this.$.container.querySelectorAll('.month');
      forEach(all_months, function (month) {
        month.addEventListener('click', function () {
          this.classList.toggle('selected');
          this.active = !this.active;
          that.selection = update_selection(all_months);
        });
      });

      forEach(this.$.container.querySelectorAll('.year-label'), function (year) {
        year.addEventListener('click', function () {
          forEach(year.parentNode.children, function (month) {
            if (month !== year) {
              month.classList.toggle('selected');
              month.active = !month.active;
              that.selection = update_selection(all_months);
            }
          });
        });
      });
    },

    setSelection : function (selection) {
      var all_months = this.$.container.querySelectorAll('.month');
      forEach(all_months, function (month) {
        if (selection.indexOf(month.getAttribute('data-month')) > -1) {
          month.classList.add('selected');
          month.active = true;
        } else {
          month.classList.remove('selected');
          month.active = false;
        }
      });
    }
  });
}());
