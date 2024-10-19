// script.js
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('reset');
let currentPlayer = 'X';
let gameBoard = Array(9).fill('');
let isGameActive = true;

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], 
  [0, 3, 6], [1, 4, 7], [2, 5, 8], 
  [0, 4, 8], [2, 4, 6]             
];


function updateStatus(message) {
  statusText.textContent = message;
}

function checkWinner() {
  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (
      gameBoard[a] &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[a] === gameBoard[c]
    ) {
      highlightWinner(combination);
      updateStatus(`Player ${currentPlayer} wins! 🎉`);
      isGameActive = false;
      return;
    }
  }

  // Check for a draw
  if (!gameBoard.includes('')) {
    updateStatus("It's a draw! 🤝");
    isGameActive = false;
  }
}

function highlightWinner(combination) {
    combination.forEach(index => {
      const cell = cells[index];
      cell.classList.add('win');
    });
  }
function handleClick(event) {
  const cell = event.target;
  const index = cell.getAttribute('data-index');

  if (gameBoard[index] || !isGameActive) return;

  gameBoard[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer.toLowerCase());

  checkWinner();

  // Switch players
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  if (isGameActive) {
    updateStatus(`Player ${currentPlayer}'s turn`);
  }
}

// Reset the game
function resetGame() {
  gameBoard.fill('');
  cells.forEach(cell => {
    cell.textContent = '';
    cell.className = 'cell'; 
  });
  currentPlayer = 'X';
  isGameActive = true;
  updateStatus(`Player ${currentPlayer}'s turn`);
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);
updateStatus(`Player ${currentPlayer}'s turn`);
