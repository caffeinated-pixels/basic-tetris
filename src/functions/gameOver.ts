import { gameState } from '../game-state'
import { grid, hiscoreDisplay, gameOverMessage } from '../dom/elements'

// TODO: clear nextTetrominoDisplay when game is over
/* GAME OVER CONDITION
checks if any of the squares in the tetromino starting position are taken */
export const gameOver = (): void => {
  if (
    gameState.currentTetromino.some((index) =>
      gameState.squares[gameState.currentPosition + index].classList.contains(
        'taken'
      )
    )
  ) {
    gameState.isGameOver = true

    for (let i = 0; i < 180; i++) {
      // clean up the grid
      gameState.squares[i].classList.remove('taken', 'tetromino')
      gameState.squares[i].removeAttribute('style')
    }

    grid.style.backgroundColor = '#b59aef' // game over background-color

    gameOverMessage.style.display = 'flex' // show game over message

    if (gameState.score > gameState.hiscore) {
      // updates hi score
      gameState.hiscore = gameState.score * 1
    }

    hiscoreDisplay.textContent = `${gameState.hiscore}` // changes score display
    clearInterval(gameState.timerId) // clears timer interval for moveDown
  }
}
