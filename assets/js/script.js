var currentTimer = 120;
var timerCount;
const questions = [
    {
        question: "What color is the sky?",
        choices: ["Blue", "Red", "Yellow", "Pink"],
        correct: "Blue"
    }
]

function runTimer () {
    //starts timer countdown
    timerCount = setInterval(function () {
        currentTimer--;
        $("#timer-bar").html("Time: " + currentTimer + " seconds");
        //transitions to results page when time is up
        if (currentTimer <= 0) {
            clearInterval(timerCount);
            displayPage("#question-screen", "#result-screen");
        }
    }, 1000)
}
//hides current div and displays a new one
function displayPage (remove, display) {
    $(remove).removeClass("visible").addClass("hidden");
    $(display).removeClass("hidden").addClass("visible");
}

$(document).ready(function () {
    //starts timer and shows question screen when start quiz button is clicked
    $("#btn-start").click(function() {
        displayPage("#title-screen", "#question-screen");
        runTimer();
        askQuestion(0);
    });
});

function askQuestion (currentQuestion) {
    var currentQuestion = currentQuestion;
    
    console.log(currentTimer);
    if (currentQuestion < questions.length) {
        $("#question-text").text(questions[currentQuestion].question);
        $("#btn-answer-1").text(questions[currentQuestion].choices[0]);
        $("#btn-answer-2").text(questions[currentQuestion].choices[1]);
        $("#btn-answer-3").text(questions[currentQuestion].choices[2]);
        $("#btn-answer-4").text(questions[currentQuestion].choices[3]);
    }
    //waits for player to select an answer
    $("#question-screen").on("click", "button", function () {     
        var userAnswer = $(this).text();
        var answerDelay = 2;
        var correctAnswer = questions[currentQuestion].correct;    
        
        console.log(correctAnswer === userAnswer);

        if (userAnswer === correctAnswer) {
            $("#answer-response").text("Correct!");
        } else {
            $("#answer-response").text("Wrong!");
        }
        //displays correct/incorrect message for 0.5 seconds, then moves to the next question or ends the quiz
        answerTimer = setInterval(function () {
            answerDelay--;
            if (answerDelay <= 0) {
                clearInterval(answerTimer);
                currentQuestion++
                $("#answer-response").text("");

                if (currentQuestion > questions.length - 1 || currentTimer <= 0) {
                    clearInterval(timerCount);
                    endQuiz(currentTimer);
                }
                askQuestion(currentQuestion);  
            }
         }, 500);
    });
}

function endQuiz (finalScore) {
    displayPage("#question-screen", "#result-screen");
    $("#final-score").text(finalScore);
}