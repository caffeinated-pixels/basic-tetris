import { gameState } from '../game-state'
import { grid, hiscoreDisplay } from '../dom/elements'

const displayGameOverMessage = () => {
  const gameOverDiv = document.createElement('div')
  gameOverDiv.classList.add('text-center', 'game-over')
  gameOverDiv.id = 'game-over'

  const gameOverText = document.createElement('p')
  gameOverText.textContent = 'GAME OVER!'
  gameOverDiv.appendChild(gameOverText)

  const tryAgainText = document.createElement('p')
  tryAgainText.textContent = 'PLEASE TRY AGAIN \u2764'

  gameOverDiv.appendChild(tryAgainText)
  grid.appendChild(gameOverDiv)
}

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

    // while (grid.firstChild) {
    //   grid.removeChild(grid.firstChild) // removes all grid divs from HTML document
    // }

    grid.style.backgroundColor = '#b59aef' // game over background-color

    displayGameOverMessage()

    if (gameState.score > gameState.hiscore) {
      // updates hi score
      gameState.hiscore = gameState.score * 1
    }

    hiscoreDisplay.textContent = `${gameState.hiscore}` // changes score display
    clearInterval(gameState.timerId) // clears timer interval for moveDown
  }
}
