// select all elements
const start = document.getElementById("start")
const quiz = document.getElementById("quiz")
const question = document.getElementById("question")
const qImg = document.getElementById("qImg")
const choiceA = document.getElementById("A")
const choiceB = document.getElementById("B")
const choiceC = document.getElementById("C")
const choiceD = document.getElementById("D")
const counter = document.getElementById("counter")
const timeGauge = document.getElementById("timeGauge")
const progress = document.getElementById("progress")
const scoreDiv = document.getElementById("scoreContainer")
var shuffledQuestions
var currentQuestionIndex
var questions
// create questions
function generateQuestions() {
    var rr = Math.floor(Math.random() * 256)
    var gg = Math.floor(Math.random() * 256)
    var bb = Math.floor(Math.random() * 256)
    var ff = Math.floor(Math.random() * 256)
    var correctColor = "rgb(" + rr + "," + gg + "," + bb + ")"
    var colorOne = "rgb(" + ff + "," + gg + "," + bb + ")"
    var colorTwo = "rgb(" + rr + "," + ff + "," + bb + ")"
    var colorThree = "rgb(" + rr + "," + gg + "," + ff + ")"
    var colorChoices = [correctColor, colorOne, colorTwo, colorThree]
    var shuffledColors = colorChoices.sort(() => Math.random() - .5)
    var correctAnswer;

    (correctColor == shuffledColors[0]) ?
        correctAnswer = 'A' :
        (correctColor == shuffledColors[1]) ?
            correctAnswer = 'B' :
            (correctColor == shuffledColors[2]) ?
                correctAnswer = 'C' :
                correctAnswer = 'D';

    questions = [
        {
            question: "Which colour matches " + correctColor + "?",
            imgSrc: "img/paint.svg",
            choiceA: shuffledColors[0],
            choiceB: shuffledColors[1],
            choiceC: shuffledColors[2],
            choiceD: shuffledColors[3],
            correct: correctAnswer
        }
    ];
    return questions
}



// create some variables

const lastQuestion = 9;
let runningQuestion = 0;
let count = 0;
const questionTime = 10; // 10s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion() {
    let q = generateQuestions()[0];

    question.innerHTML = "<p>" + q.question + "</p>";
    qImg.innerHTML = "<img src=" + q.imgSrc + ">";
    choiceA.style.backgroundColor = q.choiceA;
    choiceB.style.backgroundColor = q.choiceB;
    choiceC.style.backgroundColor = q.choiceC;
    choiceD.style.backgroundColor = q.choiceD;
}

start.addEventListener("click", startQuiz);

// start quiz
function startQuiz() {
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter, 1000); // 1000ms = 1s
}

// render progress
function renderProgress() {
    for (let qIndex = 0; qIndex <= lastQuestion; qIndex++) {
        progress.innerHTML += "<div class='prog' id=" + qIndex + "></div>";
    }
}

// counter render

function renderCounter() {
    if (count <= questionTime) {
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    } else {
        count = 0;
        // change progress color to red
        answerIsWrong();
        if (runningQuestion < lastQuestion) {
            runningQuestion++;

            renderQuestion();
        } else {
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnwer

function checkAnswer(answer) {
    if (answer == questions[0].correct) {
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    } else {
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if (runningQuestion < lastQuestion) {
        runningQuestion++;
        renderQuestion();
    } else {
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect() {
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong() {
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender() {
    scoreDiv.style.display = "block";

    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score / 10);

    // choose the image based on the scorePerCent
    let img = (scorePerCent >= 80) ? "img/5.svg" :
        (scorePerCent >= 60) ? "img/4.svg" :
            (scorePerCent >= 40) ? "img/3.svg" :
                (scorePerCent >= 20) ? "img/2.svg" :
                    "img/1.svg";

    scoreDiv.innerHTML = "<img src=" + img + " height='59' width='59'>";
    scoreDiv.innerHTML += "<p>" + scorePerCent + "%</p>";
}





















