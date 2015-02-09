(function generateTable() {
    var cars = [
        {
            "manufacturer": "BMW",
            "model": "E92 320i",
            "year": 2011,
            "price": 50000,
            "class": "Family"
        },
        {
            "manufacturer": "Porsche",
            "model": "Panamera",
            "year": 2012, "price": 100000,
            "class": "Sport"
        },
        {
            "manufacturer": "Peugeot",
            "model": "305",
            "year": 1978,
            "price": 1000,
            "class": "Family"
        }];

    $('<button>').text('Generate table').on('click', generateTable).appendTo('body');

    function generateTable() {
        var $table = $('<table>').appendTo('body');
        var $thead = $('<thead>').appendTo($table);
        var $tr = $('<tr>').appendTo($thead);
        $tr.append($('<th>').text('Manufacturer'));
        $tr.append($('<th>').text('Model'));
        $tr.append($('<th>').text('Year'));
        $tr.append($('<th>').text('Price'));
        $tr.append($('<th>').text('Class'));
        var $tbody = $('<tbody>').appendTo($table);

        cars.forEach(function (car) {
            var $tr = $('<tr>');
            $('<td>')
                .text(car.manufacturer)
                .appendTo($tr);
            $('<td>')
              .text(car.model)
              .appendTo($tr);
            $('<td>')
               .text(car.year)
               .appendTo($tr);
            $('<td>')
               .text(car.price)
               .appendTo($tr);
            $('<td>')
               .text(car.class)
               .appendTo($tr);

            $tr.appendTo($tbody);
        })
    }
})();