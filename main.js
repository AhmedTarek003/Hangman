// Letters
const letters = "abcdefghijklmnopqrstuvwxyz";
// Get Array from Letters
const lettersArry = Array.from(letters);
// Select letters Contaienr
const lettersContainer = document.querySelector(".letters");

lettersArry.forEach((letter) => {
  // Create span
  const span = document.createElement("span");
  // create text
  const theLetter = document.createTextNode(letter);
  // Append the letter in span
  span.appendChild(theLetter);
  // Add className for span
  span.className = "letter-box";
  // append span in the container
  lettersContainer.appendChild(span);
});

// Words + Category
const words = {
  programming: [
    "Javascript",
    "Css",
    "Python",
    "Html",
    "React",
    "Vue",
    "Angluer",
  ],
  movies: ["Spider Man", "Venom", "Django", "Inception", "Matriex"],
  people: ["Adel Emam", "Ronaldo", "Messi", "Nymear", "Mohamed Salah"],
  country: ["Egypt", "United State", "Qatar", "Palastine"],
};

const allKeys = Object.keys(words);
// Random Number
const randomNum = Math.floor(Math.random() * allKeys.length);
// Random Category
const randomCategory = allKeys[randomNum];
// Radom value Name
const randomPropVal = words[randomCategory];
// Random Number From Values
const randomValNum = Math.floor(Math.random() * randomPropVal.length);
// Random value From Random Number
const randomValName = randomPropVal[randomValNum];

// Set Category Info
document.querySelector(".game-info .category span").innerHTML = randomCategory;

// Select Letters Guess Element
const lettersGuessContiner = document.querySelector(".letters-guess");

// Convert Chosen Word To Array
const lettersAndSpace = Array.from(randomValName);

// Right Answer
let rightAnswer = 0;

// Loop in Random Name Array
lettersAndSpace.forEach((letter) => {
  // Create EmptySpan
  const emptySpan = document.createElement("span");
  // if letter = space
  if (letter === " ") {
    emptySpan.className = "with-space";
    rightAnswer++;
  }

  // Append empty space to lettersgeuss
  lettersGuessContiner.appendChild(emptySpan);
});

// Select Guess Spans
let guessSpans = document.querySelectorAll(".letters-guess span");

// worong nums
let wrongNums = 0;

// The Draw
const theDraw = document.querySelector(".hangman-draw");

// Handle Cliking On Letter
document.addEventListener("click", (e) => {
  // set The Chose Status
  let theStatus = false;

  if (e.target.className === "letter-box") {
    e.target.classList.add("clicked");

    // The Clicked Letter
    let theClickedLetter = e.target.innerHTML.toLowerCase();

    // the Chossen World
    let thechosenWorld = Array.from(randomValName.toLowerCase());

    thechosenWorld.forEach((wordLetter, worldIndex) => {
      if (wordLetter == theClickedLetter) {
        // the Status
        theStatus = true;
        // loop in Guess Spans
        guessSpans.forEach((span, spanIndex) => {
          if (worldIndex === spanIndex) {
            span.innerHTML = theClickedLetter;
            rightAnswer++;
          }
        });
      }
    });

    if (theStatus !== true) {
      wrongNums++;

      theDraw.classList.add(`wrong-${wrongNums}`);

      if (wrongNums === 8) {
        gameOver();
      }
    }

    if (theStatus === true) {
      if (lettersAndSpace.length === rightAnswer) {
        win();
      }
    }
  }
});

function gameOver() {
  lettersContainer.classList.add("finished");
  const div = document.createElement("div");
  let divtext = document.createTextNode(
    `Game Over, The Word Is [${randomValName}]`
  );
  div.appendChild(divtext);
  div.className = "popup";
  document.body.appendChild(div);
  document.getElementById("fail").play();
}
function win() {
  lettersContainer.classList.add("finished");
  const div = document.createElement("div");
  let divtext = document.createTextNode(`You Win`);
  div.appendChild(divtext);
  div.className = "popup";
  document.body.appendChild(div);
  document.getElementById("success").play();
}
