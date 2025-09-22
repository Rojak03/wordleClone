const ANSWER_LENGTH = 5;
const ROUNDS = 6;
const letters = document.querySelectorAll(".letter-box");
const loadingDiv = document.querySelector(".info-bar");
let currentGuess = "";
let currentRound = 0;
let done = false;
let wordOfTheDay;

async function getWordOfTheDay() {
  const res = await fetch("https://words.dev-apis.com/word-of-the-day");
  const data = await res.json();
  wordOfTheDay = data.word.toUpperCase();
  console.log(wordOfTheDay);
}
async function init() {

  await getWordOfTheDay();
}
document.addEventListener("keyup", (event) => {
  console.log(event);
  if (isLetter(event.key)) {
    const letter = event.key.toUpperCase();
    handleInput(letter);
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
  const res = await fetch("https://words.dev-apis.com/validate-word", {
    method: "POST",
    body: JSON.stringify({ word: currentGuess }),
  });

  const isvalid = await res.json();
  if (!isvalid.validWord) {
    alert("Not a valid word");
    return;
  }
  // TODO: check the guess against the word of the day
  for (let i = 0; i < ANSWER_LENGTH; i++) {
    const letterBox = letters[currentRound * ANSWER_LENGTH + i];
    const letter = currentGuess[i];
    if (letter === wordOfTheDay[i]) {
      letterBox.classList.add("correct");
    } else if (wordOfTheDay.includes(letter)) {
      letterBox.classList.add("wrong-location");
    } else {
      letterBox.classList.add("wrong");
    }
  }
  if (currentGuess === wordOfTheDay) {
    alert("You win!");
    done = true;
    return;
  } else if (currentRound === ROUNDS - 1) {
    alert(`You lose! The word was ${wordOfTheDay}`);
    done = true;
    return;
  }
  currentRound++;
  currentGuess = "";



}
init();