(function () {
    var PARSE_APP_ID = "Q2amMx8RPqJU7fDptYr71Yyg9yreRdThqHEseY5N";
    var PARSE_REST_API_KEY = "AtG0tOro0mbMEFFCtNw1wHBFxwDwTmxO94J39GRr";

    (function loadBooks() {
        $('#addNewBook').on("click", function () {
            $('#addForm').show();
            $('#add').click(addBook);
        });

        jQuery.ajax({
            method: "GET",
            headers: {
                "X-Parse-Application-Id": PARSE_APP_ID,
                "X-Parse-REST-API-Key": PARSE_REST_API_KEY
            },
            url: "https://api.parse.com/1/classes/Book?order=title",
            success: booksLoaded,
            error: ajaxError
        });
    })();

    function booksLoaded(data) {
        var books = data.results;

        for (var b in books) {
            var $row = $('<tr>');
            var book = books[b];

            var $td_delete = $('<td>');
            $row.append($td_delete);
            $td_delete.append(createDeleteButton(book));

            var $td_title = $('<td>');
            $row.append($td_title.text(book.title));
            $td_title.append(createEditButton('title', book));

            var $td_author = $('<td>');
            $row.append($td_author.text(book.author));
            $td_author.append(createEditButton('author', book));

            var $td_isbn = $('<td>');
            $row.append($td_isbn.text(book.isbn));
            $td_isbn.append(createEditButton('isbn', book));
            $row.appendTo('#library');
        }
    }

    function createEditButton(editedCol, targetObj) {
        var editButton = $('<a href="#" class="editBtn"> [Edit] </а>');
        editButton.data(editedCol, targetObj);
        editButton.click(editBook);

        return editButton;
    }

    function createDeleteButton(targetObj) {
        var deleteButton = $('<a href="#" class="DeleteBtn"> [Delete] </а>');
        deleteButton.data('book', targetObj);
        deleteButton.click(deleteBook);

        return deleteButton;
    }

    function addBook() {
        var title = $('#addTitle').val();
        var author = $('#addAuthor').val();
        var isbn = $('#addIsbn').val();

        if (!title || !author || !isbn) {
            $('<h3>').text('Please insert all fields!')
            .prependTo('body');
            return;
        }

        $.ajax({
            method: "POST",
            headers: {
                "X-Parse-Application-Id": PARSE_APP_ID,
                "X-Parse-REST-API-Key": PARSE_REST_API_KEY
            },
            url: 'https://api.parse.com/1/classes/Book/',
            data: JSON.stringify({
                "title": title,
                "author": author,
                "isbn": isbn
            }),
            contentType: "application/json",
            success: changeSuccessfully('added new Book: ' + title),
            error: ajaxError
        });
    }

    function editBook() {
        $('.editBtn').hide();

        var title = $(this).data("title");
        var author = $(this).data("author");
        var isbn = $(this).data("isbn");

        var $editForm = $('#editForm').show();

        if (title) {
            var key = 'title';
            var book = title;
            $editForm.before('Edit ' + book.title);
        } else if (author) {
            key = 'author';
            book = author;
            $editForm.before('Edit ' + book.author);
        } else if (isbn) {
            key = 'isbn';
            book = isbn;
            $editForm.before('Edit ' + book.isbn);
        }

        $ErroMsg = $('<h3>').text('Empty value Not Allowed!');
        $ErroMsg.hide().prependTo('body');

        $('#submitChange').on("click", function (event) {
            event.stopPropagation();

            var editedValue = $('#editBook').val();
            if (!editedValue) {
                $ErroMsg.show();
                return;
            }
           
            if (key === 'title') {
                var data = JSON.stringify({ 'title': editedValue });
            } else if (key === 'author') {
                data = JSON.stringify({ 'author': editedValue });
            } else {
                data = JSON.stringify({ 'isbn': editedValue });
            }

            $.ajax({
                method: "PUT",
                headers: {
                    "X-Parse-Application-Id": PARSE_APP_ID,
                    "X-Parse-REST-API-Key": PARSE_REST_API_KEY
                },
                url: 'https://api.parse.com/1/classes/Book/' +
                    book.objectId,
                data: data,
                contentType: "application/json",
                success: changeSuccessfully('edited - book ' + key + ' to ' + editedValue),
                error: ajaxError
            });
        });
    }

    function deleteBook() {
        var book = $(this).data("book");

        $.ajax({
            method: "DELETE",
            headers: {
                "X-Parse-Application-Id": PARSE_APP_ID,
                "X-Parse-REST-API-Key": PARSE_REST_API_KEY
            },
            url: 'https://api.parse.com/1/classes/Book/' +
                book.objectId,
            contentType: "application/json",
            success: changeSuccessfully(book.title + ' deleted'),
            error: ajaxError
        });
    }

    function changeSuccessfully(operation) {
        noty({
            text: 'Successfully ' + operation,
            layout: 'topCenter',
            timeout: 2000
        });

        setTimeout(reload, 3000);

        function reload() {
            window.location.reload();
        }
    }

    function ajaxError() {
        noty({
            text: 'Cannot load AJAX data.',
            type: 'error',
            layout: 'topCenter',
            timeout: 5000
        });
    }
})();