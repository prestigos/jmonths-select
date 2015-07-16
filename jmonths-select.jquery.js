(function($){
    $.fn.months_selector = function(options, arg){
        var $this = this;

        var update_selection = function($field){
            var months = [];
            $this.find('.month.selected').each(function(){
                months.push($(this).data('month'));
            });
            $field.val(months.join(','));
            return months;
        };

        if(options && typeof(options) == 'object'){
            // Default settings
            var settings = $.extend({
                months: new Date().getMonth() + 1,
                start_year: new Date().getFullYear(),
                start_month: new Date().getMonth() + 1,
                field: 'months',
                special: []
            }, options);

            // Hidden field to store the list of months
            var $field = $("<input type='hidden' name='" + settings.field + "'/>");
            $this.append($field);

            // Widget generation
            var months = [];
            var year = settings.start_year;
            var month = settings.start_month;
            var cls = 'month';
            for(var m=settings.months; m>0; --m){
                if(settings.special.indexOf(year + '-' + month) >= 0){
                    cls = 'month special'
                }
                else{
                    cls = 'month'
                }
                months.push(
                    "<li class='" + cls + "' data-month='" + year + "-" + ('0' + month).slice(-2) + "'>" +
                    ('0' + month).slice(-2) +
                    "</li>"
                );
                if(month == 1 || m == 1){
                    $this.append(
                        "<ul class='year'><li class='year-label'>" + year + "</li>" + months.join('') + "</ul>"
                    );
                    months = [];
                    month = 12;
                    year -= 1
                }
                else{
                    month--;
                }
            }

            var active = '';

            $this.find('.month').click(function(){
                $(this).toggleClass('selected');
                update_selection($field);
                $field.change();
            });

            $this.find('.year-label').click(function(){
                $(this).siblings().each(function(){
                    $(this).toggleClass('selected');
                });
                update_selection($field);
                $field.change();
            })
            return $this;
        }
        else if(options && typeof(options) == 'string'){
            if(options === 'setSelection'){
                $this.find('.month').each(function(){
                    var $month = $(this);
                    var month = $month.data('month');
                    if(arg.indexOf(month) >= 0){
                        $month.addClass('selected');
                    }
                    else{
                        $month.removeClass('selected');
                    }
                });
                return update_selection($this.find('input:hidden'));
            }
        }
    }
})(jQuery);
