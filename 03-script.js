const cells = document.querySelectorAll(".cell");
const moves = [];
let currentPlayer = "X";
let scores = {X: 0, O: 0};

const scoreXElement = document.getElementById("scoreX");
const scoreOElement = document.getElementById("scoreO");

cells.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    if (!cell.classList.contains("winning-cell")) {
      updateImages(cell, index);
      checkWinner();
    }
  });
});

function updateImages(cell, index) {
  const playerImage = cell.querySelector(".playerImage");
  const move = {index, src: playerImage.src};
  moves.push(move);

  if (
    !playerImage.src.includes("X.png") &&
    !playerImage.src.includes("o.png")
  ) {
    playerImage.src = currentPlayer === "X" ? "./img/X.png" : "./img/o.png";
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
}

function checkWinner() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    const cellA = document.querySelector(
      `.cell[data-index="${a}"] .playerImage`,
    );
    const cellB = document.querySelector(
      `.cell[data-index="${b}"] .playerImage`,
    );
    const cellC = document.querySelector(
      `.cell[data-index="${c}"] .playerImage`,
    );

    if (
      (cellA.src.includes("X.png") &&
        cellB.src.includes("X.png") &&
        cellC.src.includes("X.png")) ||
      (cellA.src.includes("o.png") &&
        cellB.src.includes("o.png") &&
        cellC.src.includes("o.png"))
    ) {
      highlightWinningCells([cellA, cellB, cellC], currentPlayer);
      return currentPlayer;
    }
  }

  return null;
}

function highlightWinningCells(cells, winningPlayer) {
  cells.forEach((cell) => {
    cell.parentNode.classList.add("winning-cell");
  });

  setTimeout(() => {
    cells.forEach((cell) => {
      cell.parentNode.classList.remove("winning-cell");
    });
    if (winningPlayer) {
      updateScores(winningPlayer);
    }
  }, 2000);
}
function updateScores() {
  const winningPlayer = currentPlayer === "X" ? "O" : "X";
  scores[winningPlayer] += 1;

  scoreXElement.textContent = scores.X;
  scoreOElement.textContent = scores.O;

  alert(
    `Player ${winningPlayer} has won!\nScores:\nX: ${scores.X}\nO: ${scores.O}`,
  );

  resetGame();
}

function undoMove() {
  if (moves.length > 0) {
    const lastMove = moves.pop();
    const cell = document.querySelector(
      `.cell[data-index="${lastMove.index}"] .playerImage`,
    );

    if (cell) {
      cell.src = lastMove.src;
      cell.parentNode.classList.remove("winning-cell");
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
}
function minimax(board, depth, isMaximizing) {
  const scores = {
    X: -1,
    O: 1,
    tie: 0,
  };

  const result = checkWinner(board);
  if (result !== null) {
    return scores[result];
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === "") {
        board[i] = "O";
        const score = minimax(board, depth + 1, false);
        board[i] = "";
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === "") {
        board[i] = "X";
        const score = minimax(board, depth + 1, true);
        board[i] = "";
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
}

function getBoardState() {
  const board = [];
  cells.forEach((cell) => {
    const playerImage = cell.querySelector(".playerImage");
    board.push(
      playerImage.src.includes("X.png")
        ? "X"
        : playerImage.src.includes("o.png")
        ? "O"
        : "",
    );
  });
  return board;
}

function resetGame() {
  moves.length = 0;
  currentPlayer = "X";

  cells.forEach((cell) => {
    const playerImage = cell.querySelector(".playerImage");
    playerImage.src = "./img/white.jpg";
    cell.parentNode.classList.remove("winning-cell");
  });
}
