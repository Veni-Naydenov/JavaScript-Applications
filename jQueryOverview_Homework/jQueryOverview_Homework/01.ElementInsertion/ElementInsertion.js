(function add() {
    var $container = $('<div class="container">').prependTo('body'),
         counterBefore = 1,
         counterAfter = 1;

    $('<button id="before">').text('Insert before').on('click', addBefore).appendTo('body');
    $('<button id="after">').text('Insert after').on('click', addAfter).appendTo('body');

    function addBefore() {
        var value = '<p class="before' + counterBefore + '">before' + counterBefore + '</p>';
        var $value = $(value);

        if (counterBefore === 1) {
            $container.before($value);
        } else {
            var lastClass = '.before' + (counterBefore - 1);
            var $element = $(lastClass);
            // var length = $elements.length;
            // var $lastElement = $($elements.get(length-1));
            $element.before($value);
        }

        counterBefore += 1;
    }

    function addAfter() {
        var value = '<p class="after' + counterAfter + '">after' + counterAfter + '</p>';
        var $value = $(value);

        if (counterAfter === 1) {
            $container.after($value);
        } else {
            var lastClass = '.after' + (counterAfter - 1);
            var $element = $(lastClass);
            $element.after($value);
        }

        counterAfter += 1;
    }
})();




