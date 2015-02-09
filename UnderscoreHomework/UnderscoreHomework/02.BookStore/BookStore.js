(function () {
    var books = [{ "book": "The Grapes of Wrath", "author": "John Steinbeck", "price": "34,24", "language": "French" },
{ "book": "The Great Gatsby", "author": "F. Scott Fitzgerald", "price": "39,26", "language": "English" },
{ "book": "Nineteen Eighty-Four", "author": "George Orwell", "price": "15,39", "language": "English" },
{ "book": "Ulysses", "author": "James Joyce", "price": "23,26", "language": "German" },
{ "book": "Lolita", "author": "Vladimir Nabokov", "price": "14,19", "language": "German" },
{ "book": "Catch-22", "author": "Joseph Heller", "price": "107,89", "language": "German" },
{ "book": "Catch-22", "author": "Joseph Heller", "price": "55,89", "language": "German" },
{ "book": "The Catcher in the Rye", "author": "J. D. Salinger", "price": "25,16", "language": "English" },
{ "book": "Beloved", "author": "Toni Morrison", "price": "48,61", "language": "French" },
{ "book": "Beloved", "author": "Toni Morrison", "price": "88,61", "language": "French" },
{ "book": "Of Mice and Men", "author": "John Steinbeck", "price": "29,81", "language": "Bulgarian" },
{ "book": "Animal Farm", "author": "George Orwell", "price": "38,42", "language": "English" },
{ "book": "Finnegans Wake", "author": "James Joyce", "price": "29,59", "language": "English" },
{ "book": "The Grapes of Wrath", "author": "John Steinbeck", "price": "42,94", "language": "English" }]
    //•	Group all books by language and sort them by author (if two books have the same author, sort by price)
    _.chain(books)
        .sortBy(function (book) {
            return book.author + ' ' + book.price;
        })
        .groupBy('language')
        .each(function (book) {
            var $wrapGroup = $('<div>');
            for (var i in book) {
                var $p = $('<p>');
                $p.text(JSON.stringify(book[i]));
                $p.appendTo($wrapGroup);
            }
            $('#group').append($wrapGroup);
        });

    //Get the average book price for each author
    _.chain(books)
    .groupBy('author')
    .each(function (book) {
        var fullPrice = 0,
        countBooks = book.length;

        for (var i = 0, len = countBooks; i < len; i += 1) {
            fullPrice += parseFloat(book[i].price);
        }
        var averagePrice = fullPrice / countBooks;

        var $wrapGroup = $('<div>');
        var $p = $('<p>');
        $p.text(book[0].author + " - average book price = " + averagePrice);
        $p.appendTo($wrapGroup);
        $('#averagePrice').append($wrapGroup);
    })

    //Get all books in English or German, with price below 30.00, and group them by author
    _.chain(books)
    .filter(function (book) {
        return (book.language === 'German' ||
            book.language === 'English') &&
            parseFloat(book.price) < 30;
    })
    .groupBy('author')
    .each(function (book) {
        var $wrapGroup = $('<div>');
        for (var i in book) {
            var $p = $('<p>');
            $p.text(JSON.stringify(book[i]));
            $p.appendTo($wrapGroup);
        }
        $('#byPriceLanguage').append($wrapGroup);
    })
})();