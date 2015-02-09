$(function () {
    var PARSE_APP_ID = "2jkr04vL51Z1S4GfUgKuLhakCF1gDGspCpUF6zbG";
    var PARSE_REST_API_KEY = "E1keVbF9L2N1EKVvVamxfnqkxFcFEZECgGw9PfKC";
    var cntrId;

    loadCountries();
    function loadCountries() {
        jQuery.ajax({
            method: "GET",
            headers: {
                "X-Parse-Application-Id": PARSE_APP_ID,
                "X-Parse-REST-API-Key": PARSE_REST_API_KEY
            },
            url: "https://api.parse.com/1/classes/Country?order=countryName",
            success: countriesLoaded,
            error: ajaxError
        });
    }

    function countriesLoaded(data) {
        for (var c in data.results) {
            var country = data.results[c];
            var countryItem = $('<li>');
            var countryLink = $("<a href='#'>").text(country.countryName);
            $(countryLink).data('country', country);
            $(countryLink).click(countryClicked);//clicked for town listing
            countryLink.appendTo(countryItem);
            //edit
            var editButton = $('<a href="#" class="editBtn"> [Edit] </а>');
            editButton.data('country', country);
            editButton.click(editCountry);
            editButton.appendTo(countryItem);
            //delete
            var deleteButton = $(" <button>Delete</button>");
            deleteButton.data('country', country);
            deleteButton.click(deleteCountry);
            deleteButton.appendTo(countryItem);
            countryItem.appendTo($("#countries"));
        }
        //add
        $('#addButton').click(addCountry);
    }

    function editCountry() {
        var country = $(this).data("country");
        $('#editForm')
            .show()
            .before('Edit ' + country.countryName);
        $('#submitChange').on("click", function () {
            var editedCounry = $('#editCountry').val();
            $.ajax({
                method: "PUT",
                headers: {
                    "X-Parse-Application-Id": PARSE_APP_ID,
                    "X-Parse-REST-API-Key": PARSE_REST_API_KEY
                },
                url: 'https://api.parse.com/1/classes/Country/' +
                    country.objectId,
                data: JSON.stringify(
                    { "countryName": country.countryName = editedCounry }
                ),
                contentType: "application/json",
                success: changeSuccessfully('edited - country ' + country.countryName),
                error: ajaxError
            });
        });
    }

    function addCountry() {
        $('#addForm').show();

        $('#addNewCountry').on("click", function () {
            var newCounry = $('#addCountry').val();
            $.ajax({
                method: "POST",
                headers: {
                    "X-Parse-Application-Id": PARSE_APP_ID,
                    "X-Parse-REST-API-Key": PARSE_REST_API_KEY
                },
                url: 'https://api.parse.com/1/classes/Country/',
                data: JSON.stringify(
                    { "countryName": newCounry }
                ),
                contentType: "application/json",
                success: changeSuccessfully('added'),
                error: ajaxError
            });
        });
    }

    function deleteCountry() {
        var country = $(this).data("country");

        $.ajax({
            method: "DELETE",
            headers: {
                "X-Parse-Application-Id": PARSE_APP_ID,
                "X-Parse-REST-API-Key": PARSE_REST_API_KEY
            },
            url: 'https://api.parse.com/1/classes/Country/' +
                country.objectId,
            contentType: "application/json",
            success: changeSuccessfully('deleted'),
            error: ajaxError
        });
    }

    function ajaxError() {
        noty({
            text: 'Cannot load AJAX data.',
            type: 'error',
            layout: 'topCenter',
            timeout: 5000
        });
    }

    //Town operetions  <--------------------- TOWN
    function countryClicked() {
        var country = $(this).data('country');
        cntrId = country.objectId;
        $("#towns").hide();
        $("#towns h2").text(country.countryName);
        var countryId = country.objectId;
        $.ajax({
            method: "GET",
            headers: {
                "X-Parse-Application-Id": PARSE_APP_ID,
                "X-Parse-REST-API-Key": PARSE_REST_API_KEY
            },
            url: 'https://api.parse.com/1/classes/Town?where={"country":{"__type":"Pointer","className":"Country","objectId":"' + countryId + '"}}',
            success: townsLoaded,
            error: ajaxError
        });
    }

    function townsLoaded(data) {
        $("#towns ul").html('');
        var countTowns = 0;

        for (var t in data.results) {
            var town = data.results[t];
            var townItem = $('<li>');
            townItem.text(town.townName);
            //edit
            var button = $('<a href="#" class="editBtn"> [Edit] </а>');
            button.data('town', town);
            button.click(editTown);
            button.appendTo(townItem);
            //delete
            var deleteButton = $(" <button>Delete</button>");
            deleteButton.data('town', town);
            deleteButton.click(deleteTown);
            deleteButton.appendTo(townItem);

            townItem.appendTo($("#towns ul"));
            countTowns += 1;
        }
        if (countTowns) {
            var hasTown = countTowns > 1 ?
                countTowns + ' towns' :
                 countTowns + ' town'
        } else {
            hasTown = 'No towns added yet!'
        }

        $('#town').append(' - ' + hasTown);
        $addButton = $('<a href="#">').text(' [Add new Town]');

        if (countTowns) {
            $addButton.data('countryId', town.country)
        } else {
            $addButton.data('countryId', cntrId)
        }

        $addButton.click(addTown);
        $addButton.appendTo($('#town'));

        $('#towns').show();
    }

    function editTown() {
        var town = $(this).data("town");
        $('#editForm')
            .show()
            .before('Edit ' + town.townName);
        $('#submitChange').on("click", function () {
            var editedTown = $('#editCountry').val();

            $.ajax({
                method: "PUT",
                headers: {
                    "X-Parse-Application-Id": PARSE_APP_ID,
                    "X-Parse-REST-API-Key": PARSE_REST_API_KEY
                },
                url: 'https://api.parse.com/1/classes/Town/' +
                    town.objectId,
                data: JSON.stringify(
                    { "townName": town.townName = editedTown }
                ),
                contentType: "application/json",
                success: changeSuccessfully('edited town - ' + town.townName),
                error: ajaxError
            });
        });
    }

    function addTown() {
        $('#addForm').show();
        var countryId = $(this).data("countryId");

        $('#addNewCountry').on("click", function () {
            var newTown = $('#addCountry').val();

            $.ajax({
                method: "POST",
                headers: {
                    "X-Parse-Application-Id": PARSE_APP_ID,
                    "X-Parse-REST-API-Key": PARSE_REST_API_KEY
                },
                url: 'https://api.parse.com/1/classes/Town/',
                data: JSON.stringify(
                    { "townName": newTown, "country": countryId }
                ),
                contentType: "application/json",
                success: changeSuccessfully('added new town: ' + newTown),
                error: ajaxError
            });
        });
    }

    function deleteTown() {
        var town = $(this).data("town");

        $.ajax({
            method: "DELETE",
            headers: {
                "X-Parse-Application-Id": PARSE_APP_ID,
                "X-Parse-REST-API-Key": PARSE_REST_API_KEY
            },
            url: 'https://api.parse.com/1/classes/Town/' +
                town.objectId,
            contentType: "application/json",
            success: changeSuccessfully('deleted - town: ' + town.townName),
            error: ajaxError
        });
    }

    function changeSuccessfully(operation) {
        noty({
            text: 'Successfully ' + operation,
            layout: 'topCenter',
            timeout: 2000
        });

        setTimeout(reload, 2000);

        function reload() {
            window.location.reload();
        }
    }
});