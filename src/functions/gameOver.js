import { gameState } from '../game-state'
import { grid, hiscoreDisplay } from '../dom/elements'

const displayGameOverMessage = () => {
  const gameOverDiv = document.createElement('div')
  gameOverDiv.classList.add('text-center', 'game-over')
  const gameOverText = document.createElement('p')
  gameOverText.textContent = 'GAME OVER!'
  gameOverDiv.appendChild(gameOverText)
  const tryAgainText = document.createElement('p')
  tryAgainText.textContent = 'PLEASE TRY AGAIN \u2764'
  gameOverDiv.appendChild(tryAgainText)
  grid.replaceChildren(gameOverDiv)
}

// TODO: clear nextTetrominoDisplay when game is over
/* GAME OVER CONDITION
checks if any of the squares in the tetromino starting position are taken */
export const gameOver = () => {
  if (
    gameState.currentTetromino.some((index) =>
      gameState.squares[gameState.currentPosition + index].classList.contains(
        'taken'
      )
    )
  ) {
    gameState.isGameOver = true

    for (let i = 0; i < 180; i++) {
      gameState.squares[i].classList.remove('taken') // removes .taken class from each visible div
      gameState.squares[i].classList.remove('tetromino') // removes .tetromino class
    }

    while (grid.firstChild) {
      grid.removeChild(grid.firstChild) // removes all grid divs from HTML document
    }

    grid.style.backgroundColor = '#b59aef' // game over background-color

    displayGameOverMessage()

    if (gameState.score > gameState.hiscore) {
      // updates hi score
      gameState.hiscore = gameState.score * 1
    }

    hiscoreDisplay.textContent = gameState.hiscore // changes score display
    clearInterval(gameState.timerId) // clears timer interval for moveDown
  }
}
