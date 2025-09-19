const ANSWER_LENGTH = 5;
const ROUNDS = 6;
const letters = document.querySelectorAll(".letter-box");
const loadingDiv = document.querySelector(".info-bar");
let currentGuess = "";
let currentRound = 0;
let done = false;
function init() {

  getWordOfTheDay();
}
document.addEventListener("keyup", (event) => {
  console.log(event);
  if (isLetter(event.key)) {
    handleInput(event.key);
  }
  else if (event.key === "Backspace") {
    backspace();
  }
  else if (event.key === "Enter") {
    // submit word
    submitGuess();
  }


})

function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
}
function handleInput(letter) {
  if (currentGuess.length < ANSWER_LENGTH) {
    currentGuess += letter;
  } else {
    current = currentGuess.substring(0, currentGuess.length - 1) + letter;
  }

  letters[currentRound * ANSWER_LENGTH + currentGuess.length - 1].innerText =
    letter;
}
function backspace() {
  currentGuess = currentGuess.substring(0, currentGuess.length - 1);
  letters[currentRound * ANSWER_LENGTH + currentGuess.length].innerText = "";
}
async function submitGuess() {
  if (currentGuess.length !== ANSWER_LENGTH) {
    return;
  }
  const validWord = await fetch("https://words.dev-apis.com/validate-word", {
    method: "POST",
    body: JSON.stringify({ word: currentGuess })
  });
  if (!validWord.valid) {
    alert("Not a valid word");
    return;
  }

  //check if word is real
  let wordOfTheDay;
  async function getWordOfTheDay() {
    const res = await fetch("https://words.dev-apis.com/word-of-the-day");
    const data = await res.json();
    wordOfTheDay = data.word.toUpperCase();
    console.log(wordOfTheDay);
  }
}
init();