(function($){
$.fn.months_selector = function(options){
    var $this = this;

    // Default settings
    var settings = $.extend({
        years: 1,
        start: new Date().getFullYear(),
        field: 'months'
    }, options);

    // Hidden field to store the list of months
    var $field = $("<input type='hidden' name='" + settings.field + "'/>");
    $this.append($field);

    // Widget generation
    for(var y=0; y<settings.years; ++y){
        var months = [];
        year = settings.start + y;
        var month;
        for(m = 0; m < 12; ++m){
            month = m + 1;
            months.push(
                "<li class='month' data-month='" +
                year + "-" + month +
                "'>" + month + "</li>"
            );
        }
        $this.append(
            "<ul class='year'><li class='year-label'>" + year + "</li>" + months.join('') + "</ul>"
        );
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
