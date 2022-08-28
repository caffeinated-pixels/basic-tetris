import { gameState } from '../game-state'
import { hiscoreDisplay, gameOverMessage, startBtnIcon } from '../dom/elements'
import { clearNextTetrominoDisplay } from './displayNextTetromino'
import { stopGameTimer } from './gameTimer'
import { START_BTN_ICONS } from '../constants'

const checkForBlockage = (): boolean =>
  gameState.currentTetromino.some((index) =>
    gameState.squares[gameState.currentPosition + index].classList.contains(
      'taken'
    )
  )

const clearGameGrid = (): void => {
  for (let i = 0; i < 180; i++) {
    gameState.squares[i].classList.remove('taken', 'tetromino')
    gameState.squares[i].removeAttribute('style')
  }
}

const checkForHiscore = (): void => {
  if (gameState.score > gameState.hiscore) updateHiscore()
}

const updateHiscore = (): void => {
  gameState.hiscore = gameState.score
  localStorage.setItem('tetrisHiscore', `${gameState.hiscore}`)
  hiscoreDisplay.textContent = `${gameState.hiscore}`
}

export const gameOver = (): void => {
  const isFirstRowBlocked = checkForBlockage()

  if (isFirstRowBlocked) {
    gameState.isGameOver = true
    startBtnIcon.textContent = START_BTN_ICONS[0]
    clearGameGrid()
    clearNextTetrominoDisplay()
    gameOverMessage.style.display = 'flex' // show game over message

    checkForHiscore()
    stopGameTimer()
  }
}
