(function($){
$.fn.months_selector = function(options){
    var $this = this;

    // Default settings
    var settings = $.extend({
        months: new Date().getMonth() + 1,
        start_year: new Date().getFullYear(),
        start_month: new Date().getMonth() + 1,
        field: 'months'
    }, options);

    // Hidden field to store the list of months
    var $field = $("<input type='hidden' name='" + settings.field + "'/>");
    $this.append($field);

    // Widget generation
    var months = [];
    var year = settings.start_year;
    var month = settings.start_month;
    for(var m=settings.months; m>0; --m){
        months.push(
            "<li class='month' data-month='" +
            year + "-" + month +
            "'>" + ('0' + month).slice(-2) + "</li>"
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

    var update_selection = function(){
        var months = [];
        $this.find('.month.selected').each(function(){
            months.push($(this).data('month'));
        });
        $field.val(months.join(':'));
    };

    $this.find('.month').click(function(){
        $(this).toggleClass('selected');
        update_selection();
    });

    $this.find('.year-label').click(function(){
        $(this).siblings().each(function(){
            $(this).toggleClass('selected');
        });
    })
}
})(jQuery);
