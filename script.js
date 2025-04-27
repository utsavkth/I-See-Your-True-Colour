// === Hamburger Menu Toggle ===
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

const links = document.querySelectorAll('.nav-links a');
links.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('show');
  });
});

// === Start Quiz Button (from index.html) ===
function startQuiz() {
  window.location.href = 'colours.html';
}

// === Quiz Data ===
const questions = [
  {
    question: "Your coworker forgot to update you on an important change. How do you react?",
    answers: [
      { text: "Call them out firmly.", color: "Red" },
      { text: "Laugh it off and adjust.", color: "Yellow" },
      { text: "Feel quietly frustrated but redo it anyway.", color: "Green" },
      { text: "Feel angry about the lack of communication and process.", color: "Blue" }
    ]
  },
  {
    question: "At a friend's house party, the host asks you to give a 'thank you' speech. What do you do?",
    answers: [
      { text: "Jump up and deliver something bold and confident.", color: "Red" },
      { text: "Crack a few jokes and wing it casually.", color: "Yellow" },
      { text: "Blush, stumble through it politely, then sit down fast.", color: "Green" },
      { text: "Wish you had notes but manage a careful, short thank you.", color: "Blue" }
    ]
  },
  {
    question: "You planned a group trip but everyone is winging it. How do you feel?",
    answers: [
      { text: "Frustrated — someone needs to take charge.", color: "Red" },
      { text: "Excited — unplanned adventures are better!", color: "Yellow" },
      { text: "Uncomfortable — you prefer knowing the plan.", color: "Green" },
      { text: "Anxious — why bother planning if no one follows it?", color: "Blue" }
    ]
  },
  {
    question: "Your boss says your last report lacked quality. What’s your gut reaction?",
    answers: [
      { text: "Think: 'I'll show them next time.'", color: "Red" },
      { text: "Think: 'Meh, not a big deal.'", color: "Yellow" },
      { text: "Feel bad but stay quiet.", color: "Green" },
      { text: "Overanalyze exactly what went wrong and stress about it.", color: "Blue" }
    ]
  },
  {
    question: "You're at a networking event full of strangers. How do you behave?",
    answers: [
      { text: "Approach people directly and make connections.", color: "Red" },
      { text: "Float around, laugh, and make casual conversations.", color: "Yellow" },
      { text: "Stick close to someone you know.", color: "Green" },
      { text: "Observe first, plan what to say, then engage carefully.", color: "Blue" }
    ]
  },
  {
    question: "Someone calls you out publicly for a mistake. What do you do first?",
    answers: [
      { text: "Defend yourself immediately and strongly.", color: "Red" },
      { text: "Crack a self-deprecating joke to ease tension.", color: "Yellow" },
      { text: "Apologize softly and avoid arguing.", color: "Green" },
      { text: "Correct the mistake factually without emotion.", color: "Blue" }
    ]
  },
  {
    question: "Two job offers — one risky but exciting, one safe but stable. Your move?",
    answers: [
      { text: "Take the risk for bigger opportunity.", color: "Red" },
      { text: "Choose the one that sounds more fun or creative.", color: "Yellow" },
      { text: "Pick the safe option for peace of mind.", color: "Green" },
      { text: "Research obsessively before deciding.", color: "Blue" }
    ]
  },
  {
    question: "Group can't decide where to eat. What do you do?",
    answers: [
      { text: "Make an executive decision quickly.", color: "Red" },
      { text: "Suggest a few fun places to lighten the mood.", color: "Yellow" },
      { text: "Stay quiet, hoping someone else will decide.", color: "Green" },
      { text: "Look up best ratings and reviews first.", color: "Blue" }
    ]
  },
  {
    question: "Team keeps bending rules. How do you feel?",
    answers: [
      { text: "Frustrated — tempted to lay down the law.", color: "Red" },
      { text: "Unbothered — flexibility is key.", color: "Yellow" },
      { text: "Uneasy — you wish they’d be more respectful.", color: "Green" },
      { text: "Annoyed — rules are there for a reason.", color: "Blue" }
    ]
  },
  {
    question: "Serious argument with a close friend — what's your instinct?",
    answers: [
      { text: "Argue head-on, no backing down.", color: "Red" },
      { text: "Joke about it to cool things down.", color: "Yellow" },
      { text: "Withdraw emotionally to avoid escalation.", color: "Green" },
      { text: "Present calm, logical arguments.", color: "Blue" }
    ]
  },
  {
    question: "You're asked to lead a major event on short notice. Your instinct?",
    answers: [
      { text: "Step up immediately — challenges excite you.", color: "Red" },
      { text: "Say yes impulsively — could be fun!", color: "Yellow" },
      { text: "Feel stressed but agree quietly.", color: "Green" },
      { text: "Ask for time to prepare properly first.", color: "Blue" }
    ]
  },
  {
    question: "Team isn't following the project plan. Reaction?",
    answers: [
      { text: "Call a meeting and realign everyone.", color: "Red" },
      { text: "Adapt and change directions flexibly.", color: "Yellow" },
      { text: "Get uncomfortable but go along.", color: "Green" },
      { text: "Stress about lack of structure.", color: "Blue" }
    ]
  }
];

// === Quiz Variables ===
let currentQuestionIndex = 0;
let colorScores = {
  Red: 0,
  Yellow: 0,
  Green: 0,
  Blue: 0
};

// === DOM Elements ===
const questionContainer = document.getElementById('question-container');
const questionEl = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const resultContainer = document.getElementById('result-container');
const resultTitle = document.getElementById('result-title');
const resultDescription = document.getElementById('result-description');

// === Load Question ===
function loadQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionEl.textContent = currentQuestion.question;
  answerButtons.innerHTML = '';

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement('button');
    button.classList.add('start-button');
    button.textContent = answer.text;
    button.addEventListener('click', () => selectAnswer(answer.color));
    answerButtons.appendChild(button);
  });
}

// === Select Answer ===
function selectAnswer(color) {
  colorScores[color]++;
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

// === Show Final Result ===
function showResult() {
    questionContainer.style.display = 'none';
    resultContainer.style.display = 'block';
    resultContainer.classList.add('fade-in');

  
    // Find highest color
    const sortedColors = Object.entries(colorScores).sort((a, b) => b[1] - a[1]);
    const primaryColor = sortedColors[0][0];
    const secondaryColor = sortedColors[1][0];
    const primaryScore = sortedColors[0][1];
    const secondaryScore = sortedColors[1][1];
  
    // Full descriptions mapped to each color
    const descriptions = {
      Red: `
        <strong>You are Red — the Bold Leader 🔥</strong><br><br>
        <strong>Strengths:</strong> Decisive, ambitious, goal-driven.<br>
        <strong>Growth:</strong> Practice patience and empathy.<br><br>
        You are the spark that turns ideas into reality.
      `,
      Yellow: `
        <strong>You are Yellow — the Radiant Optimist ☀️</strong><br><br>
        <strong>Strengths:</strong> Inspiring, charismatic, full of ideas.<br>
        <strong>Growth:</strong> Slow down and listen deeply.<br><br>
        You are the sunbeam that makes people believe again.
      `,
      Green: `
        <strong>You are Green — the Calm Harmonizer 🌿</strong><br><br>
        <strong>Strengths:</strong> Compassionate, reliable, peaceful.<br>
        <strong>Growth:</strong> Speak your truth even when it's hard.<br><br>
        You are the quiet strength people didn't know they needed.
      `,
      Blue: `
        <strong>You are Blue — the Thoughtful Architect 🌊</strong><br><br>
        <strong>Strengths:</strong> Analytical, meticulous, trustworthy.<br>
        <strong>Growth:</strong> Embrace imperfection and flexibility.<br><br>
        You are the calm mind in a noisy world.
      `
    };
  
    let description = "";
  
    if (secondaryScore >= primaryScore - 2) {
      description = `You are mainly <strong>${primaryColor}</strong> with a strong influence of <strong>${secondaryColor}</strong>.<br><br>` 
      + descriptions[primaryColor];
    } else {
      description = descriptions[primaryColor];
    }
  
    resultTitle.innerHTML = `Your Colour: ${primaryColor}`;
    resultDescription.innerHTML = description;
  }
  

// === Initialize Quiz if on Colours Page ===
if (document.getElementById('quiz')) {
  loadQuestion();
}
