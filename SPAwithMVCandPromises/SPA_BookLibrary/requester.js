var ajaxRequester = (function () {
    var PARSE_APP_ID = "Q2amMx8RPqJU7fDptYr71Yyg9yreRdThqHEseY5N";
    var PARSE_REST_API_KEY = "AtG0tOro0mbMEFFCtNw1wHBFxwDwTmxO94J39GRr";

    var makeRequest = function (method, url, data, success, error) {
        $.ajax({
            headers: {
                "X-Parse-Application-Id": PARSE_APP_ID,
                "X-Parse-REST-API-Key": PARSE_REST_API_KEY
            },
            url: url,
            type: method,
            contentType: 'application/json',
            data: JSON.stringify(data) || undefined,
            success: success,
            error: error
        });
    }

    var makeGetRequest = function (url, success, error) {
        return makeRequest('GET', url, null, success, error);
    }

    var makePostRequest = function (url, data, success, error) {
        return makeRequest('POST', url, data, success, error);
    }

    var makePutRequest = function (url, data, success, error) {
        return makeRequest('PUT', url, data, success, error);
    }

    var makeDeleteRequest = function (url, success, error) {
        return makeRequest('DELETE', url, null, success, error);
    }

    return {
        get: makeGetRequest,
        post: makePostRequest,
        put: makePutRequest,
        "delete": makeDeleteRequest
    }
})();