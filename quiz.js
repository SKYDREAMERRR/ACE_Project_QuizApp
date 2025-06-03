const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Berlin", "Madrid", "Paris", "London"],
    answer: "Paris"
  },
  {
    question: "Which language runs in a web browser?",
    choices: ["Java", "C", "Python", "JavaScript"],
    answer: "JavaScript"
  },
  {
    question: "What does CSS stand for?",
    choices: ["Central Style Sheet", "Cascading Style Sheets", "Coded Style Sheet", "Computer Style Sheet"],
    answer: "Cascading Style Sheets"
  },
  {
    question: "Which HTML element is used to define a paragraph?",
    choices: ["<p>", "<h1>", "<br>", "<section>"],
    answer: "<p>"
  },
  {
    question: "What does HTTP stand for?",
    choices: ["HyperText Transfer Protocol", "HighText Transfer Protocol", "Hyper Transfer Text Protocol", "HyperText Tool Protocol"],
    answer: "HyperText Transfer Protocol"
  },
  {
    question: "What year was JavaScript created?",
    choices: ["1995", "2000", "1989", "2005"],
    answer: "1995"
  },
  {
    question: "Which keyword is used to declare a variable in JavaScript?",
    choices: ["var", "let", "const", "All of the above"],
    answer: "All of the above"
  },
  {
    question: "Which company developed React.js?",
    choices: ["Google", "Microsoft", "Facebook", "Amazon"],
    answer: "Facebook"
  },
  {
    question: "What is the correct syntax to output text in JavaScript?",
    choices: ["print('Hello')", "console.log('Hello')", "echo 'Hello'", "System.out.println('Hello')"],
    answer: "console.log('Hello')"
  },
  {
    question: "What is the default port for HTTP?",
    choices: ["21", "443", "80", "8080"],
    answer: "80"
  }
];


shuffleArray(questions); // Shuffle on start

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 10;

const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const timeEl = document.getElementById("time");
const quizBox = document.getElementById("quiz-box");
const scoreBox = document.getElementById("score-box");
const finalScoreEl = document.getElementById("final-score");

function startTimer() {
  timeLeft = 10;
  timeEl.textContent = timeLeft;
  timer = setInterval(() => {
    timeLeft--;
    timeEl.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      nextQuestion(); 
    }
  }, 1000);
}

function showQuestion() {
  const q = questions[currentQuestion];
  questionEl.textContent = q.question;
  choicesEl.innerHTML = "";

  q.choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.textContent = choice;
    btn.addEventListener("click", () => {
      clearInterval(timer);
      if (choice === q.answer) score++;
      nextQuestion();
    });
    choicesEl.appendChild(btn);
  });

  startTimer();
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

function showScore() {
  quizBox.classList.add("hidden");
  finalScoreEl.textContent = `${score} / ${questions.length}`;
  scoreBox.classList.remove("hidden");

  saveHighScore(score);
}

function shuffleArray(array) {
  // Fisher-Yates Shuffle
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Save high scores
function saveHighScore(score) {
  const maxScores = 5;
  const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  
  const newEntry = {
    score,
    date: new Date().toLocaleDateString()
  };

  highScores.push(newEntry);

  // Sort scores in descending order
  highScores.sort((a, b) => b.score - a.score);

  // Keep top 5
  highScores.splice(maxScores);

  localStorage.setItem("highScores", JSON.stringify(highScores));
}


// Start the game
showQuestion();
