var currentTimer = 120;
var timerCount;
const questions = [
    {
        question: 'What color is the sky?',
        choices: ['Blue', 'Red', 'Yellow', 'Pink'],
        correct: 'Blue'
    }
]

function runTimer() {
    //starts timer countdown
    timerCount = setInterval(function () {
        currentTimer--;
        $('timer-bar').html('Time: ' + currentTimer + ' seconds');
        //transitions to results page when time is up
        if (currentTimer <= 0) {
            clearInterval(timerCount);
            displayPage('#result-screen');
        }
    }, 1000)
}
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

$(document).ready(function () {
    //starts timer and shows question screen when start quiz button is clicked
    $('#btn-start').click(function () {
        displayPage('#question-screen');
        runTimer();
        askQuestion(0);
    });
});

function askQuestion(currentQuestion) {
    var currentQuestion = currentQuestion;
    //renders current question and answer choices
    console.log(currentTimer);
    if (currentQuestion < questions.length) {
        $('#question-text').text(questions[currentQuestion].question);
        $('#btn-answer-1').text(questions[currentQuestion].choices[0]);
        $('#btn-answer-2').text(questions[currentQuestion].choices[1]);
        $('#btn-answer-3').text(questions[currentQuestion].choices[2]);
        $('#btn-answer-4').text(questions[currentQuestion].choices[3]);
    }
    //waits for player to select an answer
    $('#question-screen').on('click', 'button', function () {
        var userAnswer = $(this).text();
        var answerDelay = 2;
        var correctAnswer = questions[currentQuestion].correct;

        console.log(correctAnswer === userAnswer);

        if (userAnswer === correctAnswer) {
            $('#answer-response').text('Correct!').css('color', 'green');
        } else {
            $('#answer-response').text('Wrong!').css('color', 'red');
            currentTimer -= 15;         //subtract 15 seconds from the timer on an incorrect answer
        }
        //displays correct/incorrect message for 0.5 seconds, then moves to the next question or ends the quiz
        answerTimer = setInterval(function () {
            answerDelay--;
            if (answerDelay <= 0) {
                clearInterval(answerTimer);
                currentQuestion++
                $('#answer-response').text('');

                if (currentQuestion > questions.length - 1 || currentTimer <= 0) {
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
            localStorage.setItem(userInitials, finalScore);
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
        //add the highest remaining score and corresponding initials
        //to the highscore table
        sortedScores.push(scores[highestIndex]);
        currentEntry = '[' + initials[highestIndex] + '] ' + scores[highestIndex];
        highscoreTable.push(currentEntry);
        //remove the score and initials from the original array so 
        //they aren't compared to again
        scores.splice(highestIndex, 1);
        initials.splice(highestIndex, 1);
        scoreCount--;
    }
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
$(document).on('click', 'a', function () {
    highscoreTable();
});