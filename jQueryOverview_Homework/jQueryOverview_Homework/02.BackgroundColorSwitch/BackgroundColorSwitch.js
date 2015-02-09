(function colorChange() {
    var DEFAULT_BACKGROUN_COLOR = '#ffffff';

    $('#paint').on('click', changeColor);

    function changeColor() {
        event.preventDefault();

        var color = $('#color-picker').val();
        var selected = $('#classSelector').val();
        var $elements = $('.' + selected);

        var $listItems = $('ul').children();
        // if we have already changed some of the lists color, reset it.
        $listItems.each(function (index, item) {
            if (!$(item).css('backgroundColor', DEFAULT_BACKGROUN_COLOR)) {
                $(element).css('backgroundColor', DEFAULT_BACKGROUN_COLOR);
            }
        });
        // set backgroundColor
        $elements.each(function (index, element) {
            $(element).css('backgroundColor', color);
        });
    }
})();


