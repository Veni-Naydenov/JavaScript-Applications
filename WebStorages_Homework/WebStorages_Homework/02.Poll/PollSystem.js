(function () {
    var questions = [
    {
        "question": "My favorite language is?",
        "answers": {
            "CSharp": false,
            "PHP": false,
            "JAVA": false,
            "javascript": true
        }
    },
    {
        "question": "My favorite beer is?",
        "answers": {
            "Zagorka": false,
            "Heineken": true,
            "Ledenika": false,
            "Ariana": false
        }
    },
    {
        "question": "What kind of girls does Superman likes?",
        "answers": {
            "brunette": false,
            "Catwoman": false,
            "blonde": false,
            "clever and sexy": true
        }
    },
    {
        "question": "How kill Laura palmer?",
        "answers": {
            "Pesho": true,
            "Nakov": false,
            "Bay Ganio": false,
            "Pulev": false
        }
    },
    ];

    var userInput = {};

    var interval = null;
    var time = 5;

    function timer() {
        $('#timer').text(time);

        if (time === 0) {
            clearInterval(interval);//stop timer
            getResults();
        }
        time -= 1;
    }

    $('#questionForm').hide();
    $('#submit').click(getResults);

    $('#submitUser').on('click', function (event) {
        //start timer
        interval = setInterval(function () { timer() }, 1000);

        var user = $('#user').val();

        if (!user) {
            $('#sign').text("Please enter user! ")
        } else {
            $('#log').hide();

            $('#sign').text(user);
            $('#sign').before("Hello user:");
            $('#questionForm').show();

            if (localStorage.getItem(user)) {
                alert(user + " alredy have answered!");

                populateQuestions();
                getResults();
            } else {
                populateQuestions();
            }
        }
        event.preventDefault();

    });

    function populateQuestions() {
        $questionList = $('#questions');
        var nameId = 1;
        questions.forEach(function (question) {
            $listQuestion = $('<li>');
            var questionText = question.question
            $listQuestion.text(questionText);
            $questionList.append($listQuestion);

            var answers = question.answers;
            var $form = $('<form/>');

            for (var answ in answers) {

                $answerInput = $('<input type="radio" name="' + nameId +
                    '" value="' + answ +
                    '" id="' + answ + '"/>');
                $answerInput.data('question', questionText);

                $answerInput.on('click', setAnswerToStorage);

                var $label = ($('<label for="' + answ + '"/>').text(answ));
                $form.append($answerInput);
                $label.appendTo($form);
                $form.appendTo($listQuestion);
            }
            nameId += 1;
        });
        event.preventDefault();
    }

    function setAnswerToStorage() {
        var $this = $(this);
        var question = $this.data('question');
        var user = $('#sign').text();

        var $answerChecked = $this.val();
        userInput[question] = $answerChecked;
        console.log(userInput);

        var jsonResult = JSON.stringify(userInput);

        localStorage.setItem(user, jsonResult);
    }

    function getResults() {
        if (event) {
            event.preventDefault();
        }
        clearInterval(interval);

        var user = $('#sign').text();
        var result = localStorage.getItem(user);

        var resultToJson = JSON.parse(result);

        if (!resultToJson) {
            alert('No answers selected!');
            showCorrectAnswers();
        }

        for (var key in resultToJson) {
            var myQuestion = key;
            var myAnswer = resultToJson[key];
            $('#' + myAnswer).attr('checked', 'checked');

            questions.forEach(function (question) {
                if (question.question == myQuestion) {
                    var answers = question.answers;

                    for (var answ in answers) {
                        if (answ == myAnswer) {
                            var $resultContainer = $('#result');

                            var $pQuest = $('<p>').text(myQuestion);
                            $pQuest.addClass('final');

                            var $pAnsw = $('<p>')
                                .text('Your answer: ' +
                                answ + ' is ' +
                                answers[answ].toString().toLocaleUpperCase());
                            $pQuest.append($pAnsw);

                            if (!answers[answ]) {
                                for (var key in answers) {

                                    if (answers[key]) {
                                        var $corect = $('<p>').text(key + ' is the Correct answer!');
                                        $corect.addClass('correct');
                                        $pQuest.append($corect);
                                    }
                                }
                            }
                            $resultContainer.append($pQuest);

                            $resultContainer.appendTo('body');
                        }
                    }
                }
            });
        }
    }

    function showCorrectAnswers() {
        questions.forEach(function (question) {
            var q = question.question;
            var answers = question.answers;

            for (var key in answers) {
                if (!answers[key]) {
                    var $corect = $('<p>').text(key + ' is the Correct answer!');
                    $corect.prepend($('<p>').text(q));
                    $corect.addClass('correct');
                }
            }

            $corect.appendTo('body');
        });
    }
})();

//---------------------------storage format <----------------------
//var userInput = {
//    user: {
//        "question": "answer",
//        "question": "answer",
//        "question": "answer"
//    }
//};


