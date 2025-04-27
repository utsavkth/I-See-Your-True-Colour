// =========================
// Quiz Logic - FINAL BUILD with Round Title Images + Fireworks + Motivations
// =========================

// ===== Redirect if no username =====
if (!localStorage.getItem('username')) {
    window.location.href = 'start.html';
  }
  
  // ===== Variables =====
  const questionEl = document.getElementById('question');
  const answerButtonsEl = document.getElementById('answer-buttons');
  const motivationalLineEl = document.getElementById('motivational-line');
  const progressBarEl = document.getElementById('progress-bar');
  
  const username = localStorage.getItem('username') || 'Friend';
  
  let currentRoundIndex = 0;
  let currentQuestionIndex = -1; // Start BEFORE the questions
  let colorScores = { Red: 0, Yellow: 0, Green: 0, Blue: 0 };
  
  // ===== Full Rounds Data =====
  const rounds = [
    {
      title: "Round 1: Everyday Instincts",
      image: "assets/round1.png",
      questions: [
        {
          question: `${username}, you're meeting new people at a party. What's your first move?`,
          answers: [
            { text: "Take charge and introduce yourself to everyone.", color: "Red" },
            { text: "Crack jokes and start lively chats.", color: "Yellow" },
            { text: "Stick close to someone you know.", color: "Green" },
            { text: "Observe quietly before joining in.", color: "Blue" }
          ]
        },
        {
          question: `${username}, a friend cancels plans last minute. What's your gut reaction?`,
          answers: [
            { text: "Suggest a new plan immediately.", color: "Red" },
            { text: "Laugh it off and make other plans.", color: "Yellow" },
            { text: "Feel disappointed but hide it.", color: "Green" },
            { text: "Wonder why they canceled and overthink it.", color: "Blue" }
          ]
        },
        {
          question: `${username}, your boss says your last report was below expectations. How do you respond?`,
          answers: [
            { text: "Defend your work and promise improvements.", color: "Red" },
            { text: "Stay cheerful and move on quickly.", color: "Yellow" },
            { text: "Feel bad and work silently to improve.", color: "Green" },
            { text: "Analyze all feedback carefully and create a detailed fix plan.", color: "Blue" }
          ]
        },
        {
          question: `${username}, your friends are debating where to go for dinner. What do you do?`,
          answers: [
            { text: "Make a final decision quickly.", color: "Red" },
            { text: "Suggest somewhere fun and spontaneous.", color: "Yellow" },
            { text: "Let others decide to avoid conflict.", color: "Green" },
            { text: "Research the best options and suggest the top-rated.", color: "Blue" }
          ]
        }
      ],
      motivation: `🌟 Amazing, ${username}! You just finished understanding your natural instincts. Let's see how you react in the heat of the moment!`
    },
    {
      title: "Round 2: In The Heat of The Moment",
      image: "assets/round2.png",
      questions: [
        {
          question: `${username}, you're asked to lead a surprise event. What's your instinct?`,
          answers: [
            { text: "Step up and lead without hesitation.", color: "Red" },
            { text: "Say yes impulsively and figure it out later.", color: "Yellow" },
            { text: "Feel nervous but accept politely.", color: "Green" },
            { text: "Ask for time to plan properly first.", color: "Blue" }
          ]
        },
        {
          question: `${username}, a group project falls behind. How do you react?`,
          answers: [
            { text: "Call a meeting to fix the delays.", color: "Red" },
            { text: "Encourage everyone to stay positive.", color: "Yellow" },
            { text: "Quietly work overtime to catch up.", color: "Green" },
            { text: "Create a detailed rescue plan.", color: "Blue" }
          ]
        },
        {
          question: `${username}, someone calls you out in public for a mistake. What's your first reaction?`,
          answers: [
            { text: "Defend yourself assertively.", color: "Red" },
            { text: "Crack a joke to lighten the moment.", color: "Yellow" },
            { text: "Apologize softly and step back.", color: "Green" },
            { text: "Respond calmly with facts.", color: "Blue" }
          ]
        },
        {
          question: `${username}, a travel plan goes wrong. Flight canceled. How do you handle it?`,
          answers: [
            { text: "Rebook immediately, no wasting time.", color: "Red" },
            { text: "Find the silver lining and explore the airport.", color: "Yellow" },
            { text: "Quietly wait and adjust your plans.", color: "Green" },
            { text: "Research all possible alternative routes calmly.", color: "Blue" }
          ]
        }
      ],
      motivation: `🚀 You're handling real-world challenges, ${username}! One final push — let's see how you thrive under pressure!`
    },
    {
      title: "Round 3: Under Pressure",
      image: "assets/round3.png",
      questions: [
        {
          question: `${username}, during a group argument, what's your natural move?`,
          answers: [
            { text: "Speak louder and try to take control.", color: "Red" },
            { text: "Crack jokes to ease the tension.", color: "Yellow" },
            { text: "Withdraw emotionally to avoid conflict.", color: "Green" },
            { text: "Present logical arguments calmly.", color: "Blue" }
          ]
        },
        {
          question: `${username}, facing a critical deadline, your preferred strategy is:`,
          answers: [
            { text: "Set aggressive goals and push hard.", color: "Red" },
            { text: "Stay flexible and creative.", color: "Yellow" },
            { text: "Stick to a quiet, steady routine.", color: "Green" },
            { text: "Create a detailed timeline and follow it strictly.", color: "Blue" }
          ]
        },
        {
          question: `${username}, your team starts bending rules. How do you feel?`,
          answers: [
            { text: "Frustrated — enforce the structure.", color: "Red" },
            { text: "Laugh it off unless it gets serious.", color: "Yellow" },
            { text: "Worry about disrespect and loyalty.", color: "Green" },
            { text: "Stress about the consequences and organize a fix.", color: "Blue" }
          ]
        },
        {
          question: `${username}, you have to present in front of 500 people. Your gut feeling?`,
          answers: [
            { text: "Excited for the challenge!", color: "Red" },
            { text: "Nervous but willing to have fun with it.", color: "Yellow" },
            { text: "Anxious but determined to do it calmly.", color: "Green" },
            { text: "Extremely prepared with notes and backup plans.", color: "Blue" }
          ]
        }
      ],
      motivation: `🔥 You crushed it, ${username}! Your true colours are shining. Let's see your results!`
    }
  ];
  
// ===== Load Question or Round Title =====
function loadQuestion() {
    const currentRound = rounds[currentRoundIndex];
  
    if (currentQuestionIndex === -1) {
      // Show Round Title
      questionEl.textContent = currentRound.title;
      answerButtonsEl.innerHTML = '';
  
      // Create Continue Button
      const continueButton = document.createElement('button');
      continueButton.classList.add('start-button');
      continueButton.textContent = "➡️ Start Round";
      continueButton.addEventListener('click', () => {
        currentQuestionIndex = 0;
        loadQuestion();
      });
      answerButtonsEl.appendChild(continueButton);
  
      // Show Round Image
      if (currentRound.image) {
        const img = document.createElement('img');
        img.src = currentRound.image;
        img.alt = "Round Image";
        img.style.display = "block";
        img.style.margin = "1.5rem auto 0 auto";
        img.style.maxWidth = "300px";
        img.style.borderRadius = "1rem";
        answerButtonsEl.appendChild(img);
      }
  
      motivationalLineEl.innerHTML = '';
      updateProgress();
      return;
    }
  
    if (currentQuestionIndex >= currentRound.questions.length) {
      // After round questions finished, show motivation
      showMotivation(currentRound.motivation, currentRound.image);
      return;
    }
  
    // Show current question
    const currentQuestion = currentRound.questions[currentQuestionIndex];
    questionEl.textContent = currentQuestion.question;
    answerButtonsEl.innerHTML = '';
  
    currentQuestion.answers.forEach(answer => {
      const button = document.createElement('button');
      button.classList.add('start-button');
      button.textContent = answer.text;
      button.addEventListener('click', () => selectAnswer(answer.color));
      answerButtonsEl.appendChild(button);
    });
  
    updateProgress();
  }
  
  // ===== Handle Answer Selection =====
  function selectAnswer(color) {
    colorScores[color]++;
    currentQuestionIndex++;
    loadQuestion();
  }
  
  // ===== Update Progress Bar =====
  function updateProgress() {
    const totalQuestions = rounds.length * 4;
    const completedQuestions = (currentRoundIndex * 4) + (currentQuestionIndex >= 0 ? currentQuestionIndex : 0);
    const progressPercent = (completedQuestions / totalQuestions) * 100;
    progressBarEl.style.width = `${progressPercent}%`;
  }
  
  // ===== Show Motivation + Fireworks + Continue Button =====
  function showMotivation(message, imagePath) {
    questionEl.textContent = message;
    answerButtonsEl.innerHTML = '';
  
    // Fireworks 🎉
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 }
    });
  
    // Add Motivation Image
    if (imagePath) {
      const img = document.createElement('img');
      img.src = imagePath;
      img.alt = "Motivation Image";
      img.style.display = "block";
      img.style.margin = "1.5rem auto 0 auto";
      img.style.maxWidth = "300px";
      img.style.borderRadius = "1rem";
      answerButtonsEl.appendChild(img);
    }
  
    // Add Continue Button
    const continueButton = document.createElement('button');
    continueButton.classList.add('start-button');
    continueButton.style.marginTop = "2rem";
  
    // ===== Important Fix Here =====
    if (currentRoundIndex === rounds.length - 1) {
      continueButton.textContent = "🎉 See Your Results ➡️";
    } else {
      continueButton.textContent = "➡️ Continue to Next Round";
    }
  
    continueButton.addEventListener('click', () => {
      currentRoundIndex++;
      currentQuestionIndex = -1;
  
      if (currentRoundIndex < rounds.length) {
        loadQuestion();
      } else {
        finishQuiz();
      }
    });
  
    answerButtonsEl.appendChild(continueButton);
  }
  
  
  // ===== Finish Quiz =====
  function finishQuiz() {
    localStorage.setItem('colorScores', JSON.stringify(colorScores));
    window.location.href = 'result.html';
  }
  
  // ===== Initialize Quiz =====
  loadQuestion();
  
  