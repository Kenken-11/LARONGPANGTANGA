document.addEventListener("DOMContentLoaded", function () {
  let randomNumber = generateRandomNumber();

  const submit = document.querySelector("#sub");
  const userInput = document.querySelector("#guessField");
  const guessSlot = document.querySelector(".guesses");
  const remaining = document.querySelector(".lastResult");
  const startOver = document.querySelector("#newGame");
  const lowOrHi = document.querySelector(".lowOrHi");

  let previousGuesses = [];
  let numGuesses = 1;
  let playGame = true;

  submit.addEventListener("click", function (e) {
    e.preventDefault();
    if (playGame) {
      const guess = parseInt(userInput.value);
      validateGuess(guess);
    }
  });

  function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
  }

  function validateGuess(guess) {
    if (isNaN(guess) || guess < 1 || guess > 100) {
      alert("Please enter a valid number between 1 and 100.");
    } else {
      previousGuesses.push(guess);
      displayGuesses(guess);

      if (numGuesses === 11) {
        displayMessage(`Game Over! Number was ${randomNumber}`);
        endGame();
      } else {
        checkGuess(guess);
      }
    }
  }

  function checkGuess(guess) {
    if (guess === randomNumber) {
      displayMessage(`Congratulations! You guessed it correctly!`);
      endGame();
    } else {
      displayMessage(
        guess < randomNumber ? `Too low! Try again!` : `Too high! Try again!`,
      );
    }
  }

  function displayGuesses(guess) {
    userInput.value = "";
    guessSlot.innerHTML += `${guess} `;
    numGuesses++;
    remaining.textContent = `${11 - numGuesses}`;
  }

  function displayMessage(message) {
    lowOrHi.textContent = message;
  }

  function endGame() {
    userInput.value = "";
    userInput.setAttribute("disabled", "");
    playGame = false;
  }

  startOver.addEventListener("click", function () {
    randomNumber = generateRandomNumber();
    previousGuesses = [];
    numGuesses = 1;
    guessSlot.textContent = "";
    lowOrHi.textContent = "";
    remaining.textContent = `${11 - numGuesses}`;
    userInput.removeAttribute("disabled");
    playGame = true;
  });
});
