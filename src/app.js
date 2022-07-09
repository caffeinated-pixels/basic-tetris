import { GAME_TIMINGS, TETROMINOS, WIDTH } from './constants/'
import { gameState } from './game-state'

import {
  grid,
  levelDisplay,
  linesDisplay,
  scoreDisplay,
  startBtn,
} from './dom/elements'

import {
  addScore,
  displayNextTetromino,
  drawTetromino,
  isAtLeftEdge,
  isAtRightEdge,
  preventScrolling,
  rng,
  setFirstTetromino,
  undrawTetromino,
  gameOver,
  rotateTetromino,
} from './functions/'

setFirstTetromino(gameState)

// ASSIGN FUNCTIONS TO KEYCODES
// we control the tertrominos with the arrow keys
function control(e) {
  if (!gameState.isGameOver && !gameState.isGamePaused) {
    // won't excute if game is over or paused
    if (e.key === 'ArrowLeft') moveLeft()
    else if (e.key === 'ArrowUp') rotateTetromino() // ArrowUp, obviously!
    else if (e.key === 'ArrowRight') moveRight()
    else if (e.key === 'ArrowDown') {
      gameState.score += 1 // softdrop score, 1pt per row
      scoreDisplay.textContent = gameState.score // update html score display
      moveDown()
    }
  }
}
document.addEventListener('keydown', control)
window.addEventListener('keydown', preventScrolling)

// MOVE DOWN FUNCTION
function moveDown() {
  undrawTetromino() // remove squares
  gameState.currentPosition += WIDTH // move down 1 row
  drawTetromino() // redraw squares in new positions
  freeze() // checks what's below the tetromino
}

// FREEZE FUNCTION
// checks for "taken" squares below the current tetromino
function freeze() {
  if (
    gameState.currentTetromino.some((index) =>
      gameState.squares[
        gameState.currentPosition + index + WIDTH
      ].classList.contains('taken')
    )
  ) {
    // checks the next grid square down for the class .taken
    gameState.currentTetromino.forEach((index) =>
      gameState.squares[gameState.currentPosition + index].classList.add(
        'taken'
      )
    )
    // if true, adds to the class .taken to the grid divs & movement stops

    // we then start a new tetromino falling from the top
    gameState.tetrominoIndex = gameState.nextTetrominoIndex
    gameState.nextTetrominoIndex = rng() // selects new tetromino
    gameState.currentTetromino =
      TETROMINOS[gameState.tetrominoIndex][gameState.currentRotation]
    gameState.currentPosition = 4 // resets to starting position
    drawTetromino() // draw new tetromino
    displayNextTetromino() // to display next tetromino in mini-grid
    addScore() // checks for completed lines when tertrominos stack
    gameOver() // checks for game over condition
  }
}

// MOVE LEFT FUNCTION
/* won't move left if at grid edge or there is a blockage (.taken);
modulus calc will only eval to 0 if in grid position 0, 10, 20, 30, etc */
function moveLeft() {
  undrawTetromino() // remove the squares
  if (!isAtLeftEdge()) gameState.currentPosition -= 1 // moves tetromino 1 column to the left

  // checks if any grid divs have the class .taken; ie whether it bumps into another tetromino
  if (
    gameState.currentTetromino.some((index) =>
      gameState.squares[gameState.currentPosition + index].classList.contains(
        'taken'
      )
    )
  ) {
    gameState.currentPosition += 1 // moves tetromino back 1 to the right
  }

  drawTetromino() // redraw tetromino in new position
}

// MOVE RIGHT FUNCTION
/* won't move right if at edge or there is a blockage (.taken);
modulus calc will only eval to 9 (ie 10-1=9) if in grid position 9, 19, 29, 39, etc */
function moveRight() {
  undrawTetromino() // remove the squares
  if (!isAtRightEdge()) gameState.currentPosition += 1 // moves tetromino 1 column to the right

  if (
    gameState.currentTetromino.some((index) =>
      gameState.squares[gameState.currentPosition + index].classList.contains(
        'taken'
      )
    )
  ) {
    gameState.currentPosition -= 1 // moves tetromino back 1 to the left
  }

  drawTetromino()
}

// START/PAUSE BTN FUNCTIONALITY
startBtn.addEventListener('click', () => {
  if (gameState.isGameOver) {
    // reset values if game over, man!
    gameState.score = 0
    scoreDisplay.textContent = gameState.score
    gameState.level = 0
    levelDisplay.textContent = gameState.level
    gameState.lines = 0
    linesDisplay.textContent = gameState.lines
    gameState.linesLevel = 0
    gameState.isGameOver = false
    gameState.isGamePaused = false

    grid.removeChild(grid.firstChild) // remove game over message
    gameState.squares.forEach((cell) => grid.appendChild(cell)) // redraws grid
    grid.style.backgroundColor = '#ffd37b' // resets background color
    for (let i = 0; i < 180; i++) {
      // reset grid squares color
      gameState.squares[i].style.backgroundColor = ''
    }

    drawTetromino() // restarts game
    gameState.timerId = setInterval(moveDown, GAME_TIMINGS[gameState.level])
    gameState.nextTetrominoIndex = rng()
    displayNextTetromino()
  } else {
    // if !isGameOver, ie game is active or before starting 1st game
    if (gameState.timerId) {
      // if gameState.timerId truthy, ie not undefined/null
      clearInterval(gameState.timerId) // pauses game
      gameState.timerId = null
      gameState.isGamePaused = true
      scoreDisplay.textContent = 'paused'
    } else {
      gameState.isGamePaused = false
      scoreDisplay.textContent = gameState.score
      drawTetromino()
      gameState.timerId = setInterval(moveDown, GAME_TIMINGS[gameState.level]) // unpauses game
      displayNextTetromino()
    }
  }
})
