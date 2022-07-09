import { COLORS, GAME_TIMINGS, TETROMINOS, WIDTH } from './constants/'
import { gameState } from './game-state'

import {
  grid,
  levelDisplay,
  linesDisplay,
  scoreDisplay,
  startBtn,
  nextTetrominoDisplay,
} from './dom/elements'

import {
  addScore,
  drawTetromino,
  isAtLeftEdge,
  isAtRightEdge,
  preventScrolling,
  rng,
  setFirstTetromino,
  undrawTetromino,
  gameOver,
} from './functions/'

setFirstTetromino(gameState)

// ASSIGN FUNCTIONS TO KEYCODES
// we control the tertrominos with the arrow keys
function control(e) {
  if (!gameState.isGameOver && !gameState.isGamePaused) {
    // won't excute if game is over or paused
    if (e.key === 'ArrowLeft') moveLeft()
    else if (e.key === 'ArrowUp') rotate() // ArrowUp, obviously!
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
    displayShape() // to display next tetromino in mini-grid
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

// FUNCTION FOR CORRECTING ROTATION BUG
// prevents t,l,j,i tetrominos rotating through the edge onto the other side of the grid!!!
function checkRotatedPosition(pos) {
  pos = pos || gameState.currentPosition // gets current pos then checks if the piece is near the left side
  if ((pos + 1) % WIDTH < 4) {
    // +1 to compensate for possible difference between squares & pos
    if (isAtRightEdge()) {
      // check if it has rotated through to right side
      gameState.currentPosition += 1 // if so, add 1 to push it back
      checkRotatedPosition(pos) // check again as iTet might need +1 adjustment to pos
    }
  } else if (pos % WIDTH > 5) {
    // checks if tetromino near right side
    if (isAtLeftEdge()) {
      // checks if it has rotated through to left side
      gameState.currentPosition -= 1 // if so, minus 1 to push it back
      checkRotatedPosition(pos) // check again as iTet might need +1 adjustment to pos
    }
  }
}

// ROTATE TETROMINO FUNCTION
function rotate() {
  // can cause t,l,j,i to go through wall at edge (see above)
  undrawTetromino()
  gameState.currentRotation++
  if (gameState.currentRotation === gameState.currentTetromino.length) {
    // resets rotation when gets to array end
    gameState.currentRotation = 0
  }
  gameState.currentTetromino =
    TETROMINOS[gameState.tetrominoIndex][gameState.currentRotation] // set to new rotation
  checkRotatedPosition() // checks if tetromino has rotated through the side of grid
  drawTetromino() // redraws tetromino
}

const displayWIDTH = 4 // each row is only 4 wide
const displayIndex = 0 // reference position on grid; top-left corner

// Tetrominos without rotations; adjusted for 4x4 grid
const upNextTetrominoes = [
  [1, displayWIDTH + 1, displayWIDTH * 2 + 1, displayWIDTH * 2], // jTetromino
  [1, displayWIDTH + 1, displayWIDTH * 2 + 1, displayWIDTH * 2 + 2], // lTetromino
  [0, displayWIDTH, displayWIDTH + 1, displayWIDTH * 2 + 1], // zTetromino
  [2, displayWIDTH + 1, displayWIDTH + 2, displayWIDTH * 2 + 1], // sTetromino
  [1, displayWIDTH, displayWIDTH + 1, displayWIDTH + 2], // tTetromino
  [0, 1, displayWIDTH, displayWIDTH + 1], // oTetromino
  [1, displayWIDTH + 1, displayWIDTH * 2 + 1, displayWIDTH * 3 + 1], // iTetromino
]

function displayShape() {
  // displays next tetromino in the mini-grid
  nextTetrominoDisplay.forEach((square) => {
    square.classList.remove('tetromino') // clears the mini-grid
    square.style.backgroundColor = '' // remove color
  })
  upNextTetrominoes[gameState.nextTetrominoIndex].forEach((index) => {
    // draws next tetromino
    nextTetrominoDisplay[displayIndex + index].classList.add('tetromino')
    nextTetrominoDisplay[displayIndex + index].style.backgroundColor =
      COLORS[gameState.nextTetrominoIndex]
  })
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
    displayShape()
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
      displayShape()
    }
  }
})
