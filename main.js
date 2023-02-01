///////////////////////////////
/**           DATA           */
///////////////////////////////

// Words
const words = [
  "Hello",
  "Programming",
  "Code",
  "Javascript",
  "Town",
  "Country",
  "Testing",
  "Youtube",
  "Linkedin",
  "Twitter",
  "Github",
  "Leetcode",
  "Internet",
  "Python",
  "Scala",
  "Destructuring",
  "Paradigm",
  "Styling",
  "Cascade",
  "Documentation",
  "Coding",
  "Funny",
  "Working",
  "Dependencies",
  "Task",
  "Runner",
  "Roles",
  "Test",
  "Rust",
  "Playing",
  "Puppies",
  "Tendrils",
  "Emergence",
  "Intricacy",
  "Expeditiously",
  "Fantasticness",
  "Unimaginable",
  "Incomprehensive",
];

//  Setting Levels
const lvls = {
  Easy: 6,
  Normal: 3,
  Hard: 2,
};

let defaultLvlName = "Easy";
let defaultSeconds = lvls[defaultLvlName];

////////////////////////////////
/**          Elements         */
////////////////////////////////

// Select Form
const level = document.querySelector(".select-form");
// Message
const lvlNameSpan = document.querySelector(".message .lvl");
const secondsSpan = document.querySelector(".message .seconds");
// Start Button
const startBtn = document.querySelector(".start");
// The Word
const theWord = document.querySelector(".the-word");
// The Input Field
const input = document.querySelector(".input");
// The Upcoming Words
const upcomingWords = document.querySelector(".upcoming-words");
// Control
const timeLeftSpan = document.querySelector(".time span");
const scoreGot = document.querySelector(".score .got");
const scoreTotal = document.querySelector(".score .total");
// Finish
const finish = document.querySelector(".finish");
// Sounds
const success = document.querySelector("#success");
const failure = document.querySelector("#failure");

////////////////////////////////
/**          Functions         */
////////////////////////////////

//---Levels Handler
const handleLevel = () => {
  let lvlName = level.value;
  let lvlSeconds = lvls[lvlName];

  // Create The user Chosen settings
  lvlNameSpan.innerHTML = lvlName;
  secondsSpan.innerHTML = lvlSeconds;
};

// ---Capitalize The Word
const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.toLowerCase().slice(1);
};

//---Generate Random Word
const genRandomWord = (_) => {
  // Get Random Word From Array
  let randomWord = words[Math.floor(Math.random() * words.length)];

  // Get Word Index
  let wordIndex = words.indexOf(randomWord);

  // Remove Word From Array
  words.splice(wordIndex, 1);

  // Show The Random Word
  theWord.innerHTML = randomWord;

  // Call genUpcomingWords Function
  genUpcomingWords();

  // Call startPlay Function
  startPlay();
};

//---Generate Upcoming Words
const genUpcomingWords = () => {
  // Empty Upcoming Words
  upcomingWords.innerHTML = "";

  // Generate Upcoming Words
  for (key in words) {
    let div = document.createElement("div");
    div.innerHTML = words[key];
    upcomingWords.appendChild(div);
  }
};

//---Check The Words
const checkWords = () => {
  // Compare The Words
  if (
    capitalize(input.value) == theWord.innerHTML || // or
    words.includes(capitalize(input.value))
  ) {
    // Increase The Score
    scoreGot.innerHTML++;

    // Empty The Input Field
    input.value = "";

    // Check If There are More Words
    if (words.length > 0) {
      // Call genRandomWord Function
      genRandomWord();
    } else {
      // Create The Finish Message
      finish.innerHTML = `<span class="good">Congratulations</span>`;
      // Play Success Sound
      success.play();
      // Show The Start Button And Finish Message
      finish.style.display = "block";
      setInterval((_) => {
        startBtn.style.display = "block";
      }, 3000);
    }
  } else {
    // Create The Finish Message
    finish.innerHTML = `<span class="bad">Game Over</span>`;
    // Play Success Sound
    failure.play();
    // Show The Start Button And Finish Message
    finish.style.display = "block";
    setInterval((_) => {
      startBtn.style.display = "block";
    }, 3000);
  }
};

//---Start Play
const startPlay = (_) => {
  timeLeftSpan.innerHTML = secondsSpan.innerHTML;

  let start = setInterval(() => {
    timeLeftSpan.innerHTML--;

    if (timeLeftSpan.innerHTML == "0") {
      // Stop Timer
      clearInterval(start);

      // Call checkWords Function
      checkWords();
    }
  }, 1000);
};

//*---------      Setting Level Name + Seconds + Score

// Create Default Settings
lvlNameSpan.innerHTML = defaultLvlName;
secondsSpan.innerHTML = defaultSeconds;
scoreTotal.innerHTML = words.length;

//*---------     Game

// Start Game
startBtn.onclick = (btn) => {
  btn.target.style.display = "none";
  finish.style.display = "none";
  input.focus();
  // Call genRandomWord Function
  genRandomWord();
};

//*---------       Input

// Disable Past Event
input.onpaste = (_) => {
  return false;
};
