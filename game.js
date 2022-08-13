var gamePattern = []
var buttonColours = ["red", "blue", "green", "yellow"]
var userClickedPattern = []
var level = 0
var started = false

function nextSequence() {
    userClickedPattern = []
    $("h1").html("level " + level++)
   
    var randomNumber = Math.floor(Math.random() * 4)

    var randomChosenColour = buttonColours[randomNumber]
    gamePattern.push(randomChosenColour)


    var a = "#" + randomChosenColour
    $(a).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour)
}

$(".btn").click(function (e) {
    var userChosenColour = e.currentTarget.attributes.id.nodeValue
    //console.log(userChosenColour)
    userClickedPattern.push(userChosenColour)
    console.log(userClickedPattern)
    playSound(userChosenColour)
    animatePress(userChosenColour)
    var a = userClickedPattern.length - 1
    checkAnswer(a)
})


function playSound(name) {

    var a1 = new Audio("sounds/" + name + ".mp3")
    a1.play()
}

function animatePress(currentColor) {
    var a = "." + currentColor
    $(a).addClass("pressed")
    setTimeout(function () {
        $(a).removeClass("pressed")
    }, 100)



}

$(document).keypress(function () {
    if (!started) {
console.log(started)
        var a = "level " + level
        $("h1").html(a)
        nextSequence()
       started = true
    }
})

function checkAnswer(currentLevel) {

    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("ok")
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence()
            }, 1000)

        }

    }
    else {
        var sound = "wrong"
        playSound(sound)
        $("body").addClass("game-over")
        setTimeout(function (){
            $("body").removeClass("game-over")
        },100)
        $("h1").html("game over.press any key to start")
     startOver()
    }
}
function startOver(){
    level=0
    gamePattern=[]
    started=false

}