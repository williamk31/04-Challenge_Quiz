var timeEl = document.querySelector(".timer");
var secondsLeft = 60;
var container = document.querySelector(".container")
var questionName = document.querySelector("h1");
var questionText = document.querySelector("p");
var displayScore = document.querySelector(".highscore")
var buttons = document.querySelector(".buttons");
var startButton = document.createElement("button");
startButton.innerHTML = "Start";
var answerKey = document.querySelector("h2");
var inputForm = document.querySelector(".form")
var questionIdx = 0;
var score = {
    correct: 0,
    incorrect: 0,
}
var allScores = JSON.parse(localStorage.getItem("highscore")) || [];
var highScores = {
    initials: "",
    score: "",
    correct: "",
    incorrect: "",
}

//create the data for the questions and answers
var questionData = [
    {
        question: "What is the correct way to declare a variable in JavaScript?", 
        answer1: "variable x = 5",
        answer2: "var x = 5",
        answer3: "x = 5",
        answer4: "let x = 5",
        correctAnswer: "var x = 5",
    },
    {
        question: "How do you write a comment in JavaScript?", 
        answer1: "//This is a comment",
        answer2: "<!--This is a comment-->",
        answer3: "'This is a comment'",
        answer4: "/This is a comment/",
        correctAnswer: "//This is a comment",
    },
    {
        question: "Which of the following is used to add a new element to the end of an array?", 
        answer1: "array.addEnd()",
        answer2: "array.push()",
        answer3: "array.append()",
        answer4: "array.insertEnd()",
        correctAnswer: "array.push()",
    },
    {
        question: "What is the purpose of the document.getElementById() function in JavaScript?", 
        answer1: "It gets the value of an element",
        answer2: "It sets the value of an element.",
        answer3: "It retrieves an element by its id.",
        answer4: "It changes the id of an element.",
        correctAnswer: "It retrieves an element by its id.",
    },
    {
        question: "Arrays in JavaScript can be used to store____:", 
        answer1: "Numbers and Strings",
        answer2: "Objects and Booleans",
        answer3: "Only Numbers and Objects",
        answer4: "Both A and B",
        correctAnswer: "Both A and B",
    },
    {
        question: "How do you prevent a form from submitting in JavaScript?",
        answer1: "form.preventSubmit()",
        answer2: "preventDefault()",
        answer3: "form.stopSubmit()",
        answer4: "stopPropagation()",
        correctAnswer: "preventDefault()",
    },
    {
        question: "The === operator is used to check for_____:",
        answer1: "similarity between two variables",
        answer2: "equality between two variables",
        answer3: "strict equality of both type and value",
        answer4: "if a number is equal to a letter",
        correctAnswer: "strict equality of both type and value",
    },
    {
        question: "Which of the following is NOT a way to make a function in JavaScript?",
        answer1: "function myFunction()",
        answer2: "var myFunction = function()",
        answer3: "function myFunction(x, y)",
        answer4: "var myFunction: functionality",
        correctAnswer: "var myFunction: functionality",
    },
    {
        question: "What is the purpose of the this keyword in JavaScript?",
        answer1: "It refers to the previous function in the call stack.",
        answer2: "It refers to the global object.",
        answer3: "It refers to the current object in a method.",
        answer4: "It is used for mathematical operations.",
        correctAnswer: "It refers to the current object in a method.",
    },
    {
        question: "What would appear in the console for the expression: console.log(3 + '3')?",
        answer1: "6",
        answer2: "'33'",
        answer3: "33",
        answer4: "'6'",
        correctAnswer: "33"
    }
] 

//function to show previous high scores
function renderHighScores(){
    //grabs high scores from local storage or an empty array if no high scores
    var storedScores = JSON.parse(localStorage.getItem
        ("highscore")) || [];
        var viewHighScores = document.querySelector(".view-highscore");
        //displays all previous high scores
    for (i=0; i<storedScores.length; i++){
        var hiScoreName = document.createElement("p");
        hiScoreName.textContent = storedScores[i].initials;
        viewHighScores.appendChild(hiScoreName);
        var hiScoreTime = document.createElement("p");
        hiScoreTime.textContent = storedScores[i].score;
        viewHighScores.appendChild(hiScoreTime);
        var hiScoreCor = document.createElement("p");
        hiScoreCor.textContent = storedScores[i].correct;
        viewHighScores.appendChild(hiScoreCor);
        var hiScoreInc = document.createElement("p");
        hiScoreInc.textContent = storedScores[i].incorrect;
        viewHighScores.appendChild(hiScoreInc);
    }
}

//listens for a click on "View High Score"
displayScore.addEventListener("click", function(event){
    //calls the display high score function
    displayHighScore()
})

//function to display high scores
function displayHighScore(){
    document.querySelector(".container").style.display = "none";
    var viewHighScores = document.querySelector(".view-highscore")
    var h1El = document.createElement("h1")
    h1El.textContent = "High Scores"
    viewHighScores.appendChild(h1El);
    renderHighScores();
}

//Sets text to introduction on website load
function init() {
    questionName.textContent = "JavaScript Knowledge Quiz";
    questionText.textContent = "This quiz is designed to test your JavaScript knowledge. You will have 60 seconds to complete the quiz once you hit the start button. If you answer a question incorrectly, 5 seconds will be taken off the clock."
    buttons.appendChild(startButton);
}
init();

//event listener for the start button
startButton.addEventListener("click", function(event) {
    event.stopPropagation();
     //starts timer on click
    setTime();
    //calls the function to create buttons
    createButtons(questionIdx);
    //removes startButton
    buttons.removeChild(startButton);
}
);

//sets timer to one minute and begins countdown
function setTime() {
    var timeInterval = setInterval(function (){
        secondsLeft--;
        timeEl.textContent = "Time: " + secondsLeft;
        //calls functions when timer runs out
        if(secondsLeft <= 0) {
            clearInterval(timeInterval);
            displayMessage();
            removeButtons();
            results();
        }if(questionIdx > questionData.length-1) {
            clearInterval(timeInterval);
            // results();
        }
    },1000);
}

//Displays message when time is up that the game is over
function displayMessage() {
    window.alert("Time's Up!");
}

//creates answer buttons
function createButtons(initialQuestion) {
    questionText.textContent = questionData[questionIdx].question;
    var ansBtnA = document.createElement("button");
    ansBtnA.textContent = questionData[initialQuestion].answer1;
    ansBtnA.setAttribute("id", "button-1");
    buttons.appendChild(ansBtnA);
    console.log(ansBtnA)
    var ansBtnB = document.createElement("button");
    ansBtnB.textContent = questionData[initialQuestion].answer2;
    ansBtnB.setAttribute("id", "button-2");
    buttons.appendChild(ansBtnB);
    var ansBtnC = document.createElement("button");
    ansBtnC.textContent = questionData[initialQuestion].answer3;
    ansBtnC.setAttribute("id", "button-3");
    buttons.appendChild(ansBtnC);
    var ansBtnD = document.createElement("button");
    ansBtnD.textContent = questionData[initialQuestion].answer4;
    ansBtnD.setAttribute("id", "button-4");
    buttons.appendChild(ansBtnD);

    //add event handler for buttons
    buttons.addEventListener("click", function (event) {
        event.stopPropagation();
        var element = event.target;
        if(element.textContent === questionData[questionIdx].correctAnswer) {
            answerKey.textContent = "Correct!";
            score.correct++;
        } else{
            answerKey.textContent = "Incorrect!";
            score.incorrect++;
            secondsLeft-=5;
        }
        console.log(score);
        //advances to the next question
        questionIdx++;
        advanceToNextQuestion(questionIdx);
    })
}

//creates function to remove answer buttons
function removeButtons(){
    var button1 = document.getElementById("button-1");
    var button2 = document.getElementById("button-2");
    var button3 = document.getElementById("button-3");
    var button4 = document.getElementById("button-4");
    button1.parentElement.removeChild(button1);
    button2.parentElement.removeChild(button2);
    button3.parentElement.removeChild(button3);
    button4.parentElement.removeChild(button4);
}

//populates answer buttons with text for each question
function advanceToNextQuestion(questionIdx){
    if(questionIdx > questionData.length-1) {
        //removes answer buttons before displaying results
        removeButtons()
        results()
    }else{
        //set next question
        questionText.textContent = questionData[questionIdx].question;
        //set answers for question
        document.querySelector("#button-1").textContent = questionData[questionIdx].answer1;
        document.querySelector("#button-2").textContent = questionData[questionIdx].answer2;
        document.querySelector("#button-3").textContent = questionData[questionIdx].answer3;
        document.querySelector("#button-4").textContent = questionData[questionIdx].answer4;
    }   
}

//creates the function to display results
function results(){
    questionName.textContent = "Quiz Complete! Your High Score: " + secondsLeft;
    questionText.textContent = "Correct: " + score.correct + "; Incorrect: " + score.incorrect;
    //removes answerKey text
    answerKey.textContent = "";
    //creates input form for initials
    var formIntls = document.createElement("form");
    formIntls.setAttribute("id", "input-initials");
    var inputIntls = document.createElement("input");
    inputIntls.setAttribute("type", "text");
    inputIntls.setAttribute("placeholder", "Enter your initials");
    inputIntls.setAttribute("id", "input-text")
    var submitIntls = document.createElement("input");
    submitIntls.setAttribute("type", "submit");
    submitIntls.setAttribute("value", "Enter");
    submitIntls.setAttribute("id", "submit");
    var inputText = document.getElementById("input-text");
    inputForm.appendChild(formIntls);
    formIntls.appendChild(inputIntls);
    inputForm.appendChild(submitIntls);
    submitIntls.addEventListener("click", function(event){
        event.preventDefault();
        highScores.initials = inputIntls.value.trim();
        highScores.correct = score.correct;
        highScores.incorrect = score.incorrect;
        highScores.score = secondsLeft;
        storeHighScore()
        displayHighScore()
    })
}

//store high scores to local storage
function storeHighScore() {
    allScores.push(highScores)
    localStorage.setItem("highscore", JSON.stringify(allScores));
}