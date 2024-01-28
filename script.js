const questions = [
  {
    question: "What does the Dom stand for in JavaScript?",
    answer: [
      { text: "Document Object Model", correct: true },
      { text: "Data Object Model", correct: false },
      { text: "Document Order Model", correct: false },
      { text: "Dynamic Object Model", correct: false },
    ],
  },
  {
    question: "What does the === operator do in JavaScript?",
    answer: [
      { text: "Assignment ", correct: false },
      { text: "Equality (strict)", correct: true },
      { text: "Inequality", correct: false },
      { text: "Logical AND", correct: false },
    ],
  },
  {
    question: "What does the NaN value represent in JavaScript?",
    answer: [
      { text: "Not a Number", correct: true },
      { text: "No assigned value", correct: false },
      { text: "Null", correct: false },
      { text: " Negative number", correct: false },
    ],
  },
  {
    question: "How do you declare a function in JavaScript?",
    answer: [
      { text: "function myFunction()", correct: false },
      { text: "var myFunction = function()", correct: false },
      { text: " both a and b", correct: true },
      { text: " none of the above", correct: false },
    ],
  },
  {
    question:
      "Which of the following is used to comment a single line in JavaScript?",
    answer: [
      { text: "//", correct: true },
      { text: "/* */", correct: false },
      { text: " <!-- -->", correct: false },
      { text: "  ---", correct: false },
    ],
  },
];

const questionElement = document.querySelector("#question");
const answerButtons = document.querySelector("#answer-button");
const nextButton = document.querySelector("#next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answer.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");

    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}
function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScrore() {
  resetState();
  questionElement.innerHTML = `you scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScrore();
  }
}
nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});
startQuiz();
