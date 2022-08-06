import { gameState } from '../game-state'
import { hiscoreDisplay, gameOverMessage } from '../dom/elements'
import { clearNextTetrominoDisplay } from './displayNextTetromino'

const checkForBlockage = (): boolean =>
  gameState.currentTetromino.some((index) =>
    gameState.squares[gameState.currentPosition + index].classList.contains(
      'taken'
    )
  )

export const gameOver = (): void => {
  const isFirstRowBlocked = checkForBlockage()

  if (isFirstRowBlocked) {
    gameState.isGameOver = true

    for (let i = 0; i < 180; i++) {
      // clean up the grid
      gameState.squares[i].classList.remove('taken', 'tetromino')
      gameState.squares[i].removeAttribute('style')
    }
    clearNextTetrominoDisplay()
    gameOverMessage.style.display = 'flex' // show game over message

    if (gameState.score > gameState.hiscore) {
      // updates hi score
      gameState.hiscore = gameState.score * 1
    }

    hiscoreDisplay.textContent = `${gameState.hiscore}` // changes score display
    clearInterval(gameState.timerId) // clears timer interval for moveDown
  }
}
