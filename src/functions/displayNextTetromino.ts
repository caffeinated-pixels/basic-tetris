import { gameState } from '../game-state'
import { COLORS, UP_NEXT_TETROMINOS } from '../constants'
import { nextTetrominoDisplay } from '../dom/elements'

const DISPLAY_INDEX = 0 // reference position on grid; top-left corner

export const clearNextTetrominoDisplay = () => {
  nextTetrominoDisplay.forEach((square) => {
    square.classList.remove('tetromino')
    square.removeAttribute('style')
  })
}

export const displayNextTetromino = (): void => {
  clearNextTetrominoDisplay()

  UP_NEXT_TETROMINOS[gameState.nextTetrominoIndex].forEach((index) => {
    nextTetrominoDisplay[DISPLAY_INDEX + index].classList.add('tetromino')
    nextTetrominoDisplay[DISPLAY_INDEX + index].style.backgroundColor =
      COLORS[gameState.nextTetrominoIndex]
  })
}
