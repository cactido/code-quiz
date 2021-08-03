var currentTimer = 121;

function runTimer () {
    var timerCount = setInterval(function () {
        currentTimer--;
        $("#timer-bar").html("Time: " + currentTimer + " seconds");

        if (currentTimer <= 0) {
            clearInterval(timerCount);
            $("#timer-bar").html("Time's up!");
        }
    }, 1000)
}

$(document).ready(function () {
    $("#btn-start").click(function() {
        $("#title-screen").removeClass("visible").addClass("hidden");
        $("#question-screen").removeClass("hidden").addClass("visible");
        runTimer();
    });
});