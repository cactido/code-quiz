var currentTimer = 120;
const questions = [
    {
        question: "What color is the sky?",
        choices: ["Blue", "Red", "Yellow", "Pink"],
        correct: "Blue"
    }
]

function runTimer () {
    //starts timer countdown
    var timerCount = setInterval(function () {
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
        startQuiz();
    });
});

function startQuiz () {
    var currentQuestion = 0;

    if (currentQuestion < questions.length) {
        $("#question-text").text(questions[currentQuestion].question);
        $("#btn-answer-1").text(questions[currentQuestion].choices[0]);
        $("#btn-answer-2").text(questions[currentQuestion].choices[1]);
        $("#btn-answer-3").text(questions[currentQuestion].choices[2]);
        $("#btn-answer-4").text(questions[currentQuestion].choices[3]);
    }

    $("#question-screen").on("click", "button", function () {
        switch ($(this).attr("number")) {
            case "1":
                console.log("1");
                break;
            case "btn-answer-2":
                $(this).text(checkTriviaAnswer(1, correctAnswerPosition));
                break;
            case "btn-answer-3":
                $(this).text(checkTriviaAnswer(2, correctAnswerPosition));
                break;
             case "btn-answer-4":
                $(this).text(checkTriviaAnswer(3, correctAnswerPosition));
                break;       
        }
    });
}