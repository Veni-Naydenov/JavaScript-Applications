(function () {
    var user;
    function login() {
        user = $('#user').val();
        localStorage.setItem('user', user);
    }

    if (!localStorage.getItem('count')) {
        localStorage.setItem('count', 0);
    }

    if (!sessionStorage.getItem('count')) {
        sessionStorage.setItem('count', 0);
    }

    var local = parseInt(localStorage.getItem('count')) + 1;
    localStorage.setItem('count', local);
    var session = parseInt(sessionStorage.getItem('count')) + 1;
    sessionStorage.setItem('count', session);

    var $local = $('#local-count').text('Total visits: ' + localStorage.getItem('count'))
    var $session = $('#session-count').text('Session visits: ' + sessionStorage.getItem('count'))
    $local.show().appendTo('body');
    $session.show().appendTo('body');

    if (localStorage.getItem('user')) {
        $('#login').hide();
        var $div = $('<div>').text('Hello: ' + localStorage.getItem('user'));
        $div.addClass('log');
        $div.prependTo('body');
    } else {
        $('#submit').click(login);
    }
})();