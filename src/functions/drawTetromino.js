import { gameState } from '../game-state'
import { COLORS } from '../constants'

// we "draw" the shapes by colouring in the corresponding grid divs with CSS styling
export const drawTetromino = () => {
  gameState.currentTetromino.forEach((index) => {
    gameState.squares[gameState.currentPosition + index].classList.add(
      'tetromino'
    )
    // uses the css class .tetromino to style the grid squares
    gameState.squares[gameState.currentPosition + index].style.backgroundColor =
      COLORS[gameState.tetrominoIndex]
    // sets the background-color for the tertromino
  })
}
