// =========================
// Result Page Logic - Kundali Style (Utsav Final)
// =========================

// ===== Variables =====
const soulGreeting = document.getElementById('soulGreeting');
const colourResult = document.getElementById('colourResult');
const soulSections = document.getElementById('soulSections');
const kundaliChart = document.getElementById('kundaliChart');

const username = localStorage.getItem('username') || 'Friend';
const colorScores = JSON.parse(localStorage.getItem('colorScores'));

// ===== Soul Greeting =====
soulGreeting.innerHTML = `🎉 Welcome, <strong>${username}</strong>. Your soul carries a beautiful energy. Let's reveal it...`;

if (colorScores) {
  const finalColour = Object.keys(colorScores).reduce((a, b) => colorScores[a] > colorScores[b] ? a : b);

  colourResult.innerHTML = `🔮 ${finalColour}`;

  // ===== Confetti Launch 🎉 =====
  confetti({
    particleCount: 250,
    spread: 120,
    origin: { y: 0.6 }
  });

  // ===== Soul Storytelling =====
  let soulStory = "";

  switch (finalColour) {
    case "Red":
      soulStory = `
        <h3>🌟 Your Strengths:</h3><p>Bold. Decisive. Firestarter of worlds.</p>
        <h3>🌑 Your Challenges:</h3><p>Patience under construction. 🛠️</p>
        <h3>🌱 Your Growth Path:</h3><p>Lead with grace, not just speed.</p>
        <h3>🌈 Your Blessing:</h3><p>"Ignite without burning. Inspire without pushing."</p>`;
      break;
    case "Yellow":
      soulStory = `
        <h3>🌟 Your Strengths:</h3><p>Joyful. Creative. The sunbeam through clouds.</p>
        <h3>🌑 Your Challenges:</h3><p>Sometimes life demands focus, not just fireworks.</p>
        <h3>🌱 Your Growth Path:</h3><p>Ground your sparkle.</p>
        <h3>🌈 Your Blessing:</h3><p>"You are the sunbeam that breaks through storm clouds."</p>`;
      break;
    case "Green":
      soulStory = `
        <h3>🌟 Your Strengths:</h3><p>Compassionate. Loyal. Gentle anchor for hearts.</p>
        <h3>🌑 Your Challenges:</h3><p>Silent battles cost you peace.</p>
        <h3>🌱 Your Growth Path:</h3><p>Speak your sacred truth.</p>
        <h3>🌈 Your Blessing:</h3><p>"You are the calm after the storm."</p>`;
      break;
    case "Blue":
      soulStory = `
        <h3>🌟 Your Strengths:</h3><p>Insightful. Wise. Architect of quiet revolutions.</p>
        <h3>🌑 Your Challenges:</h3><p>Overthoughts, under-shared feelings.</p>
        <h3>🌱 Your Growth Path:</h3><p>Trust emotion alongside logic.</p>
        <h3>🌈 Your Blessing:</h3><p>"You are the quiet mirror that reflects unseen truths."</p>`;
      break;
    default:
      soulStory = `<p>🌈 Your soul is a multiverse. Embrace all paths.</p>`;
  }

  soulSections.innerHTML = soulStory;

  // ===== Learn More Button =====
  const colorLinks = {
    "Red": "red.html",
    "Yellow": "yellow.html",
    "Green": "green.html",
    "Blue": "blue.html"
  };

  soulSections.innerHTML += `
    <div style="text-align:center; margin-top:2rem;">
      <a href="${colorLinks[finalColour]}" class="start-button">🔎 Learn More About Your Colour →</a>
    </div>
  `;

  // ===== Diamond Message =====
  kundaliChart.insertAdjacentHTML('beforebegin', `
    <div style="text-align:center; margin-top:2rem; font-style:italic; color:#555;">
      🚧 LOOK AWAY! 🚧<br/>
      "Diamonds are formed deep within the crust.<br/>
      They take a long time to reveal their brilliance.<br/>
      What you see now may look messy —<br/>
      but that's only because your 3D brain cannot comprehend a 5D creation.<br/>
      🌌 Peace. 🌌"
    </div>
  `);

  // ===== Populate Kundali Houses =====
  populateKundaliContent(finalColour);

} else {
  colourResult.textContent = "Unknown";
  soulSections.innerHTML = "<p>We couldn't find your energy map. Please retake the journey!</p>";
}

// ===== Function: Fill Kundali Houses =====
function populateKundaliContent(color) {
  const houses = {
    Red: [
      "You charge forward before fear can catch you.",
      "You treasure victories like sacred possessions.",
      "Words are weapons — you strike quickly and sharply.",
      "Emotions are buried beneath ambition and pride.",
      "Creativity fueled by adrenaline and conquest.",
      "Service means leading others to action, not following.",
      "You seek partners who can match your fire.",
      "You transform by facing battles, not avoiding them.",
      "You learn best through struggle and triumph.",
      "Your legacy is carved in action, not intention.",
      "You inspire movements with your boldness.",
      "You fear stillness more than storms — growth comes from patience."
    ],
    Yellow: [
      "Your smile is your armor and your invitation.",
      "You value experiences over possessions.",
      "Your voice lifts, entertains, and brightens.",
      "Emotions are worn lightly, but felt deeply.",
      "Creativity bubbles endlessly — your gift and your flood.",
      "You heal others simply by existing joyfully.",
      "You crave partners who laugh at life with you.",
      "Change excites you more than it frightens you.",
      "You believe knowledge should be playful and inspiring.",
      "You chase careers that let you imagine and innovate.",
      "You attract communities with your optimism.",
      "Your subconscious seeks wonder, not worry."
    ],
    Green: [
      "You carry peace within you like sacred water.",
      "You treasure loyalty and meaningful memories.",
      "Your words comfort, not command.",
      "Your emotions are deep rivers, rarely disturbed.",
      "Creativity blooms in quiet moments of care.",
      "Service for you is nurturing others without fanfare.",
      "You seek soul-deep bonds, not surface attractions.",
      "Transformation happens gently, like seasons changing.",
      "You find wisdom through compassion and patience.",
      "You climb ladders slowly but steadily, with heart intact.",
      "You build true community, one loyal bond at a time.",
      "Your soul’s secret wish: to be seen without noise."
    ],
    Blue: [
      "You move through life observing more than declaring.",
      "You value meaning over materialism.",
      "Words are measured carefully, like chess moves.",
      "Your inner world is vast, silent, and stormy.",
      "Creativity comes in intricate patterns, not wild splashes.",
      "You serve by building systems that last beyond you.",
      "You seek partners who understand your silences.",
      "You transform by understanding, not reacting.",
      "Wisdom comes to you as slow revelation, not sudden lightning.",
      "You pursue careers where thought outweighs noise.",
      "You bond through shared insights, not shared drinks.",
      "Your soul dreams in blueprints and galaxies."
    ]
  };

  const ids = ["house6", "house5", "house4", "house7", "center", "house3", "house8", "house9", "house2", "house11", "house10", "house1"];
  const content = houses[color] || [];

  ids.forEach((id, index) => {
    const house = document.getElementById(id);
    if (house && content[index]) {
      house.innerHTML = content[index];
    }
  });
}

// ===== Function: Download Screenshot as Sharing =====
function downloadScreenshot() {
  const resultSection = document.querySelector('.quiz');
  html2canvas(resultSection, { scale: 2 }).then((canvas) => {
    const link = document.createElement('a');
    link.download = 'your-true-colour-life-map.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  });
}

// ===== Restart Quiz =====
function restartQuiz() {
  localStorage.clear();
  window.location.href = 'start.html';
}
