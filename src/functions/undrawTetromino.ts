import { gameState } from '../game-state'
// to move the shapes, we have to "undraw" them first and then redraw in the new position
export const undrawTetromino = (): void => {
  gameState.currentTetromino.forEach((index) => {
    gameState.squares[gameState.currentPosition + index].classList.remove(
      'tetromino'
    )

    gameState.squares[gameState.currentPosition + index].removeAttribute(
      'style'
    )
  })
}
