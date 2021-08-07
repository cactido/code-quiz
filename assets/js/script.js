var currentTimer = 60;

const questions = [
    {
        question: 'Commonly used data types do NOT include which of the following?',
        choices: ['Strings', 'Booleans', 'Alerts', 'Numbers'],
        correct: 'Alerts'
    },
    {
        question: 'Arrays in JavaScript can be used to store which of the following?',
        choices: ['Number and strings', 'Other arrays', 'Booleans', 'All of the above'],
        correct: 'All of the above'
    },
    {
        question: 'The condition in an if/else statment is enclosed within which of the following?',
        choices: ['Quotes', 'Curly brackets', 'Parenthesis', 'Square brackets'],
        correct: 'Parenthesis'
    },
    {
        question: 'String values must be enclosed within what when being assigned to variables?',
        choices: ['Commas', 'Curly brackets', 'Quotes', 'Parenthesis'],
        correct: 'Quotes'
    },
    {
        question: 'Which of these is a tool for printing content to the debugger?',
        choices: ['JavaScript', 'Terminal/bash', 'for loops', 'console.log()'],
        correct: 'console.log()'
    }
];

//hides divs and displays the requested one (display)
function displayPage(display) {
    //hides all classes
    $('#title-screen').removeClass('visible').addClass('hidden');
    $('#question-screen').removeClass('visible').addClass('hidden');
    $('#result-screen').removeClass('visible').addClass('hidden');
    $('#highscores').removeClass('visible').addClass('hidden');
    //set the requested section to visible
    $(display).removeClass('hidden').addClass('visible');
}
//displays question/answers for the requested question
function askQuestion(currentQuestion) {
    var currentQuestion = currentQuestion;
    
    //renders current question and answer choices and resets button colors
    if (currentQuestion < questions.length) {
        $('#question-text').text(questions[currentQuestion].question);
        $('#btn-answer-1').text(questions[currentQuestion].choices[0]).css('background-color', 'rgb(77, 79, 168)');
        $('#btn-answer-2').text(questions[currentQuestion].choices[1]).css('background-color', 'rgb(77, 79, 168)');
        $('#btn-answer-3').text(questions[currentQuestion].choices[2]).css('background-color', 'rgb(77, 79, 168)');
        $('#btn-answer-4').text(questions[currentQuestion].choices[3]).css('background-color', 'rgb(77, 79, 168)');
    }
    //waits for player to select an answer
    $('#question-screen').off().on('click', 'button', function () {
        var userAnswer = $(this).text();
        var answerDelay = 2;
        var correctAnswer = questions[currentQuestion].correct;

        if (currentTimer <= 0) {
            endQuiz(0);
        }

        //changes button color to green (correct answer) or red (wrong answer)
        if (userAnswer === correctAnswer) {
            $(this).css('background-color', 'green');
        } else {
            $(this).css('background-color', 'red');
            currentTimer -= 15;
        }
        //displays the button highlight for 0.5 seconds, then moves to the next question or ends the quiz
        var answerTimer = setInterval(function () {
            answerDelay--;
            if (answerDelay <= 0) {
                clearInterval(answerTimer);
                currentQuestion++;
                if (currentQuestion > questions.length - 1) {
                    clearInterval(timerCount);
                    endQuiz(currentTimer);
                }
                askQuestion(currentQuestion);
            }
        }, 500);
    });
}
//switches to result screen and inputs user's initials for highscore table
//when the timer ends or when the user answers the last question
function endQuiz(finalScore) {
    displayPage('#result-screen');
    $('#final-score').text(finalScore);
    //validates the user's initial input, adds them to the local storage, then
    //renders the highscore table
    $('#btn-initials').click(function () {
        var userInitials = $('#user-initials').val();
        if (!userInitials || userInitials.length > 4) {
            alert('Please enter up to four letters as your initials.');
        } else {
            //add the number of keys in localStorage to the end of the user-entered
            //initials to allow for multiple entries with the same initials
            var scoreNumber = Object.keys(localStorage).length;
            localStorage.setItem(userInitials + ':' + scoreNumber, finalScore);
            highscoreTable();
        }
    });
}

function highscoreTable() {
    displayPage('#highscores');
    //retrieves keys and value pairs from localStorage, then stores them in arrays
    var scores = [],
        initials = [],
        keys = Object.keys(localStorage);

    for (let i = 0; i < keys.length; i++) {
        scores.push(localStorage.getItem(keys[i]));
        initials.push(keys[i]);
    }
    //sorts scores, highest to lowest
    var scoreCount = scores.length,
        highscoreTable = [],
        sortedScores = [];

    while (scoreCount > 0) {
        //find the index of the highest score
        var highestIndex = highestScore(scores);
        //add the highest remaining score to the highscore table
        sortedScores.push(scores[highestIndex]);
        //remove the count that was added to the initials so only the
        //initials are displayed
        var splitInitials = initials[highestIndex].split(':');
        var displayInitials = splitInitials[0];
        currentEntry = '[' + displayInitials + '] ' + scores[highestIndex];
        highscoreTable.push(currentEntry);
        //remove the score and initials from the original array so 
        //they aren't compared to again
        scores.splice(highestIndex, 1);
        initials.splice(highestIndex, 1);
        scoreCount--;
    }
    //clear the table so the new sorted list isn't appended to the old
    $('#highscore-table').empty();
    //display the sorted highscores
    for (let i = 0; i < highscoreTable.length; i++) {
        $('#highscore-table').append('<li>' + highscoreTable[i]);
    }
}

//returns index of the highest score
function highestScore(scores) {
    var highest = 0;
    for (i = 0; i < scores.length; i++) {
        if (parseInt(scores[i]) >= parseInt(scores[highest])) {
            highest = i;
        }
    }
    return highest;
}

//renders the highscore table when the Highscores link is clicked
$(document).off().on('click', 'a', function () {
    highscoreTable();
});
//starts timer and shows question screen when start quiz button is clicked
$('#btn-start').off().on('click', function () {
    currentTimer = 120;
    timerCount = setInterval(function () {
        currentTimer--;
        $('#timer-bar').text('Time: ' + currentTimer + ' seconds');
        //transitions to results page when time is up
        console.log(currentTimer);
        if (currentTimer <= 0) {
            clearInterval(timerCount);
            endQuiz(0);
        }
    }, 1000)

    displayPage('#question-screen');
    askQuestion(0);
});
//reload the page when the start over button is clicked on the highscore tablefs
$('#btn-again').off().on('click', function () {
    location.reload();
});
//clears the localStorage of highscores when the Clear Scores
//button is clicked
$('#btn-clear').off().on('click', function () {
    localStorage.clear();
    highscoreTable();
})