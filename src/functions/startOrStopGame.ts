import { gameState } from '../game-state'
import { startBtnIcon } from '../dom/elements'
import { START_BTN_ICONS } from '../constants'

import {
  scoreDisplay,
  levelDisplay,
  linesDisplay,
  gameOverMessage,
  instructionsDisplay,
} from '../dom/elements'
import { startGameTimer, stopGameTimer } from './'
import { displayNextTetromino, drawTetromino, rng } from './'

export const startOrStopGame = (): void => {
  instructionsDisplay.style.display = 'none'

  if (gameState.isGameOver) {
    resetGame()
  } else if (gameState.timerId) {
    pauseGame()
  } else {
    resumeFromPause()
  }
}

const startGame = (isNewGame?: boolean) => {
  drawTetromino()
  startGameTimer()
  if (isNewGame) gameState.nextTetrominoIndex = rng()
  displayNextTetromino()
}

const resetGame = () => {
  gameState.score = 0
  scoreDisplay.textContent = `${gameState.score}`
  gameState.level = 0
  levelDisplay.textContent = `${gameState.level}`
  gameState.lines = 0
  linesDisplay.textContent = `${gameState.lines}`
  gameState.linesLevel = 0
  gameState.isGameOver = false
  gameState.isGamePaused = false

  gameOverMessage.style.display = 'none'

  const isNewGame = true
  startBtnIcon.textContent = START_BTN_ICONS[1]
  startGame(isNewGame)
}

const pauseGame = () => {
  stopGameTimer()
  gameState.timerId = undefined
  gameState.isGamePaused = true
  scoreDisplay.textContent = 'paused'
  startBtnIcon.textContent = START_BTN_ICONS[0]
}

const resumeFromPause = () => {
  gameState.isGamePaused = false
  scoreDisplay.textContent = `${gameState.score}`

  startGame()
  startBtnIcon.textContent = START_BTN_ICONS[1]
}
