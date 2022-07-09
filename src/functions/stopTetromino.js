import { gameState } from '../game-state'
import { WIDTH, TETROMINOS } from '../constants'
import {
  drawTetromino,
  rng,
  displayNextTetromino,
  addScore,
  gameOver,
} from './'

// checks for "taken" squares below the current tetromino
export const stopTetromino = () => {
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
