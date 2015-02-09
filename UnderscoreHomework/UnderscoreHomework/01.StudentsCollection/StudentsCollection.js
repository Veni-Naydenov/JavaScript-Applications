(function global() {
    var students = [{ "gender": "Male", "firstName": "Joe", "lastName": "Riley", "age": 22, "country": "Russia" },
{ "gender": "Female", "firstName": "Lois", "lastName": "Morgan", "age": 41, "country": "Bulgaria" },
{ "gender": "Male", "firstName": "Roy", "lastName": "Wood", "age": 33, "country": "Russia" },
{ "gender": "Female", "firstName": "Diana", "lastName": "Freeman", "age": 40, "country": "Argentina" },
{ "gender": "Female", "firstName": "Bonnie", "lastName": "Hunter", "age": 23, "country": "Bulgaria" },
{ "gender": "Male", "firstName": "Joe", "lastName": "Young", "age": 16, "country": "Bulgaria" },
{ "gender": "Female", "firstName": "Kathryn", "lastName": "Murray", "age": 22, "country": "Indonesia" },
{ "gender": "Male", "firstName": "Dennis", "lastName": "Woods", "age": 37, "country": "Bulgaria" },
{ "gender": "Male", "firstName": "Billy", "lastName": "Patterson", "age": 24, "country": "Bulgaria" },
{ "gender": "Male", "firstName": "Willie", "lastName": "Gray", "age": 42, "country": "China" },
{ "gender": "Male", "firstName": "Justin", "lastName": "Lawson", "age": 38, "country": "Bulgaria" },
{ "gender": "Male", "firstName": "Ryan", "lastName": "Foster", "age": 24, "country": "Indonesia" },
{ "gender": "Male", "firstName": "Eugene", "lastName": "Morris", "age": 37, "country": "Bulgaria" },
{ "gender": "Male", "firstName": "Eugene", "lastName": "Rivera", "age": 45, "country": "Philippines" },
{ "gender": "Female", "firstName": "Kathleen", "lastName": "Hunter", "age": 28, "country": "Bulgaria" }]
    //•	Get all students with age between 18 and 24
    _.chain(students)
    .filter(function (student) {
        return student.age >= 18 &&
                student.age <= 24;
    }).each(function (student) {
        var $div = $('<p>');
        $div.text(JSON.stringify(student));
        $div.appendTo('#byAge');
    });

    //•	Get all students whose first name is alphabetically before their last name
    _.chain(students)
    .filter(function (student) {
        return student.firstName < student.lastName;
    })
    .each(function (student) {
        var $p = $('<p>');
        $p.text(student.firstName + ' ' + student.lastName);
        $p.appendTo('#byName');
    })

    //•	Get only the names of all students from Bulgaria 
    _.chain(students)
   .filter(function (student) {
       return student.country === 'Bulgaria';
   })
   .each(function (student) {
       var $p = $('<p>');
       $p.text(student.firstName + ' ' +
           student.lastName + '--- from ' +
           student.country);
       $p.appendTo('#byCountry');
   })

    //•	Get the last five students
    _.chain(students)
     .last(5)
     .each(function (student) {
         var $p = $('<p>');
         $p.text(student.firstName + ' ' +
             student.lastName + ', age=' +
             student.age +
             ', from ' +
             student.country);
         $p.appendTo('#lastFive');
     });

    //•	Get the first three students who are not from Bulgaria and are male
    _.chain(students)
    .reject(function (student) {
        return student.country === 'Bulgaria';
    })
    .filter(function (student) {
        return student.gender === 'Male';
    })
    .each(function (student) {
        var $p = $('<p>');
        $p.text(student.firstName + ' ' +
            student.lastName + ', is ' +
            student.gender +
            ', from ' +
            student.country);
        $p.appendTo('#maleNotFromBg');
    });
})();