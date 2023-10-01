const questions = [
    {
        question: " 1) Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Venus"],
        answer: "Mars"
    },
    {
        question: " 2) What is the capital of France?",
        options: ["Madrid", "Rome", "Berlin", "Paris"],
        answer: "Paris"
    },
    {
        question: " 3) What is the largest mammal in the world?",
        options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
        answer: "Blue Whale"
    },
    {
        question: " 4) Who wrote the play 'Romeo and Juliet'?",
        options: ["William Shakespeare", "Charles Dickens", "Jane Austen", " F. Scott Fitzgerald"],
        answer: "William Shakespeare"
    },
    {
        question: " 5) Which gas do plants absorb from the atmosphere?",
        options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
        answer: "Carbon Dioxide"
    }
];

const userAnswers = new Array(questions.length).fill(null);
let currentQuestionIndex = 0;
let score = 0;
let timeLimit = 20; 
let timerInterval;

const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const submitButton = document.getElementById("submit-button");
const result = document.getElementById("result");
const answersContainer = document.getElementById("answers-container");
const timerDisplay = document.getElementById("timer");

function startTimer() {
    let seconds = timeLimit;
    timerDisplay.textContent = formatTime(seconds);

    timerInterval = setInterval(function () {
        seconds--;

        if (seconds < 0) {
            clearInterval(timerInterval);
            timerDisplay.textContent = "Time's Up!";
            submitButton.disabled = true;
            endQuiz();
        } else {
            timerDisplay.textContent = `Time Left: ${formatTime(seconds)}`;
        }
    }, 1000);
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
}

startTimer(); 

function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;

    currentQuestion.options.forEach((option, index) => {
        const optionButton = document.getElementById(`option${index + 1}`);
        optionButton.textContent = option;
        optionButton.style.backgroundColor = "#3498db"; 
        optionButton.onclick = () => selectOption(option, optionButton);
    });

    result.textContent = "";
    submitButton.disabled = true;
}

function selectOption(selectedOption, optionButton) {
    const optionButtons = document.querySelectorAll(".option");
    optionButtons.forEach((btn) => {
        btn.style.backgroundColor = "#3498db"; 
    });

    optionButton.style.backgroundColor = "#beb3b3"; 

    userAnswers[currentQuestionIndex] = selectedOption;
    submitButton.disabled = false;
}

function calculateScore() {
    score = 0; 

    for (let i = 0; i < questions.length; i++) {
        if (userAnswers[i] === questions[i].answer) {
            score++;
        }
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else if (currentQuestionIndex === questions.length) {
        clearInterval(timerInterval); 
        calculateScore();
        endQuiz();
    }
}

function endQuiz() {
    calculateScore(); 

    questionText.innerHTML = `<h2>Your score: ${score}/${questions.length}</h2>`;
    optionsContainer.style.display = "none";
    submitButton.style.display = "none";
    result.textContent = "";

    const viewAnswersButton = document.createElement("button");
    viewAnswersButton.textContent = "View Answers";
    viewAnswersButton.onclick = viewAnswers;
    questionText.appendChild(viewAnswersButton);
}

function viewAnswers() {
    calculateScore(); 

    let answersHTML = "<h2>Quiz Answers:</h2>";
    const answersList = document.getElementById("answers-list");

    for (let i = 0; i < questions.length; i++) {
        const currentQuestion = questions[i];
        const answerIcon = document.createElement("span");
        const answerText = document.createElement("p");
        const userAnswer = userAnswers[i];

        answerIcon.id = `answer-icon${i + 1}`;
        answerText.id = `answer-text${i + 1}`;

        if (userAnswer === currentQuestion.answer) {
            answerIcon.innerHTML = "&#10004;";
            answerIcon.style.color = "#2ecc71"; 
        } else {
            answerIcon.innerHTML = "&#10008;";
            answerIcon.style.color = "#e74c3c"; 
        }

        answerText.innerHTML = `Your Answer: ${userAnswer}, Correct Answer: ${currentQuestion.answer}`;
        answerText.innerHTML += "<br>";

        answersList.appendChild(answerIcon);
        answersList.appendChild(answerText);
    }

    questionText.innerHTML = answersHTML;
    optionsContainer.style.display = "none";
    submitButton.style.display = "none";
    result.textContent = "";
    answersContainer.style.display = "block";
}

displayQuestion();
submitButton.addEventListener("click", nextQuestion);
