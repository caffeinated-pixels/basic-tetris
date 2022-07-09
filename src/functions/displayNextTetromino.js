import { gameState } from '../game-state'
import { COLORS } from '../constants'
import { nextTetrominoDisplay } from '../dom/elements'

const DISPLAY_INDEX = 0 // reference position on grid; top-left corner
const UP_NEXT_WIDTH = 4 // each row is only 4 wide

// Tetrominos without rotations; adjusted for 4x4 grid
export const UP_NEXT_TETROMINOS = [
  [1, UP_NEXT_WIDTH + 1, UP_NEXT_WIDTH * 2 + 1, UP_NEXT_WIDTH * 2], // jTetromino
  [1, UP_NEXT_WIDTH + 1, UP_NEXT_WIDTH * 2 + 1, UP_NEXT_WIDTH * 2 + 2], // lTetromino
  [0, UP_NEXT_WIDTH, UP_NEXT_WIDTH + 1, UP_NEXT_WIDTH * 2 + 1], // zTetromino
  [2, UP_NEXT_WIDTH + 1, UP_NEXT_WIDTH + 2, UP_NEXT_WIDTH * 2 + 1], // sTetromino
  [1, UP_NEXT_WIDTH, UP_NEXT_WIDTH + 1, UP_NEXT_WIDTH + 2], // tTetromino
  [0, 1, UP_NEXT_WIDTH, UP_NEXT_WIDTH + 1], // oTetromino
  [1, UP_NEXT_WIDTH + 1, UP_NEXT_WIDTH * 2 + 1, UP_NEXT_WIDTH * 3 + 1], // iTetromino
]

export const displayNextTetromino = () => {
  // displays next tetromino in the mini-grid
  nextTetrominoDisplay.forEach((square) => {
    square.classList.remove('tetromino') // clears the mini-grid
    square.style.backgroundColor = '' // remove color
  })
  UP_NEXT_TETROMINOS[gameState.nextTetrominoIndex].forEach((index) => {
    // draws next tetromino
    nextTetrominoDisplay[DISPLAY_INDEX + index].classList.add('tetromino')
    nextTetrominoDisplay[DISPLAY_INDEX + index].style.backgroundColor =
      COLORS[gameState.nextTetrominoIndex]
  })
}
