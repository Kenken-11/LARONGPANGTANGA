let score = JSON.parse(localStorage.getItem("score")) || {
  Wins: 0,
  Losses: 0,
  Ties: 0,
};

function aiMove() {
  const moves = ["Rock", "Paper", "Scissors"];
  const randomIndex = Math.floor(Math.random() * moves.length);
  return moves[randomIndex];
}

function playGame(playerMove) {
  const computerMove = aiMove();
  let result = "";

  if (playerMove === computerMove) {
    result = "Tie.";
  } else if (
    (playerMove === "Rock" && computerMove === "Scissors") ||
    (playerMove === "Paper" && computerMove === "Rock") ||
    (playerMove === "Scissors" && computerMove === "Paper")
  ) {
    result = "You Win!";
  } else {
    result = "You Lose!";
  }

  updateScore(result);
  updateImages(playerMove, computerMove);
  updateTopScore();

  alert(`You picked ${playerMove}. Computer picked ${computerMove}. ${result}`);
}

function updateImages(playerMove, computerMove) {
  const userPickImage = document.getElementById("userPickImage");
  const computerPickImage = document.getElementById("computerPickImage");

  userPickImage.src = `./img/${playerMove.toLowerCase()}.png`;
  computerPickImage.src = `./img/${computerMove.toLowerCase()}.png`;

  userPickImage.alt = playerMove;
  computerPickImage.alt = computerMove;
}

function updateScore(result) {
  if (result === "You Win!") {
    score.Wins += 1;
  } else if (result === "You Lose!") {
    score.Losses += 1;
  } else if (result === "Tie.") {
    score.Ties += 1;
  }

  localStorage.setItem("score", JSON.stringify(score));
}

function updateTopScore() {
  const scoreElement = document.getElementById("score");
  scoreElement.textContent = `Wins: ${score.Wins}, Losses: ${score.Losses}, Ties: ${score.Ties}`;
}

function rpsScore() {
  score.Wins = 0;
  score.Losses = 0;
  score.Ties = 0;

  localStorage.setItem("score", JSON.stringify(score));

  alert(
    `Score was reset. Wins: ${score.Wins}, Losses: ${score.Losses}, Ties: ${score.Ties}`,
  );
}
