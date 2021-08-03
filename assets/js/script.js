var currentTimer = 12;

function runTimer () {
    var timerCount = setInterval(function () {
        currentTimer--;
        $("#timer-bar").html("Time: " + currentTimer + " seconds");

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
    $("#btn-start").click(function() {
        displayPage("#title-screen", "#question-screen");
        runTimer();
    });
});