var application = application || {};

application.controller = (function () {
    function Main(dataPersister) {
        this.persister = dataPersister;
    }

    Main.prototype.load = function (selector) {
        this.attachEventHandlers();
        this.loadBooks(selector);
    }

    Main.prototype.loadBooks = function (selector) {
        this.persister.books.getAll(
          function (data) {
              var book;
              var books = data.results;

              for (var i in books) {
                  var $row = $('<tr>');
                  book = books[i];

                  var $td_delete = $('<td>');
                  $row.append($td_delete);
                  $row.attr('data-id', book.objectId);
                  $td_delete.append(createDeleteButton(book));

                  var $td_title = $('<td>');
                  $row.append($td_title.text(book.title));
                  $td_title.attr('data-id', book.objectId);
                  $td_title.attr('data-class', 'title');
                  $td_title.append(createEditButton('title', book));

                  var $td_author = $('<td>');
                  $row.append($td_author.text(book.author));
                  $td_author.attr('data-id', book.objectId);
                  $td_author.attr('data-class', 'author');
                  $td_author.append(createEditButton('author', book));

                  var $td_isbn = $('<td>');
                  $row.append($td_isbn.text(book.isbn));
                  $td_isbn.attr('data-id', book.objectId);
                  $td_isbn.attr('data-class', 'isbn');
                  $td_isbn.append(createEditButton('isbn', book));

                  $row.appendTo('#library');
              }
          },
          ajaxError);

        function createEditButton() {
            var editButton = $('<a href="#" class="editBtn"> [Edit] </а>');
            return editButton;
        }

        function createDeleteButton() {
            var deleteButton = $('<a href="#" class="DeleteBtn"> [Delete] </а>');
            return deleteButton;
        }
    }

    Main.prototype.attachEventHandlers = function () {
        var _this = this;
        $('#addNewBook').on("click", function () {
            $('#addForm').show();
            $('#add').click(addBook);
        });

        function addBook() {
            var title = $('#addTitle').val();
            var author = $('#addAuthor').val();
            var isbn = $('#addIsbn').val();

            if (!title || !author || !isbn) {
                $('<h3>').text('Please insert all fields!')
                .prependTo('body');
                return;
            }
            var book = {
                "title": title,
                "author": author,
                "isbn": isbn
            }

            _this.persister.books.add(book,
               Q.fcall(function (data) {
                   _this.loadBooks('#library');
               })
               .then(changeSuccessfully('added new Book: ' + book.title), ajaxError));
        }

        $('#library').on('click', '.DeleteBtn', function (ev) {
            var id = $(this).parent().parent().attr('data-id');
            _this.persister.books.remove(id, changeSuccessfully, ajaxError);
        })

        $('#library').on('click', '.editBtn', function (ev) {
            var id = $(this).parent().attr('data-id');
            var col = $(this).parent().attr('data-class');

            $('.editBtn').hide();
            var $editForm = $('#editForm').show();

            if (col === 'title') {
                var key = 'title';
            } else if (col === 'author') {
                key = 'author';
            } else if (col === 'isbn') {
                key = 'isbn';
            }

            $ErroMsg = $('<h3>').text('Empty value Not Allowed!');
            $('#submitChange').click(

            function editBook() {
                var editedValue = $('#editBook').val();
                if (!editedValue) {
                    $ErroMsg.show();
                    return;
                }

                if (key === 'title') {
                    var data = { 'title': editedValue };
                } else if (key === 'author') {
                    data = { 'author': editedValue };
                } else {
                    data = { 'isbn': editedValue };
                }

                _this.persister.books.put(id, data, changeSuccessfully, ajaxError);
            })
        })
    }

    function changeSuccessfully(operation) {
        noty({
            text: 'Successfully ' + operation,
            layout: 'topCenter',
            timeout: 2000
        });

        setTimeout(reload, 4000);

        function reload() {
            window.location.reload();
        }
    }

    function ajaxError() {
        noty({
            text: 'Cannot load AJAX data.',
            type: 'error',
            layout: 'topCenter',
            timeout: 3000
        });
    }

    return {
        get: function (dataPersister) {
            return new Main(dataPersister);
        }
    }
}());