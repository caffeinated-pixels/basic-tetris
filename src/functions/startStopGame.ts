import { gameState } from '../game-state'
import { GAME_TIMINGS } from '../constants'
import {
  scoreDisplay,
  levelDisplay,
  linesDisplay,
  gameOverMessage,
  instructionsDisplay,
} from '../dom/elements'
import { displayNextTetromino, drawTetromino, rng, moveDown } from './'

export const startStopGame = (): void => {
  instructionsDisplay.style.display = 'none'

  if (gameState.isGameOver) {
    resetGame()
  } else {
    // if !isGameOver, ie game is active or before starting 1st game
    if (gameState.timerId) {
      pauseGame()
    } else {
      gameState.isGamePaused = false
      scoreDisplay.textContent = `${gameState.score}`
      drawTetromino()
      gameState.timerId = setInterval(moveDown, GAME_TIMINGS[gameState.level]) // unpauses game
      displayNextTetromino()
    }
  }
}

const resetGame = () => {
  // reset values if game over, man!
  gameState.score = 0
  scoreDisplay.textContent = `${gameState.score}`
  gameState.level = 0
  levelDisplay.textContent = `${gameState.level}`
  gameState.lines = 0
  linesDisplay.textContent = `${gameState.lines}`
  gameState.linesLevel = 0
  gameState.isGameOver = false
  gameState.isGamePaused = false

  gameOverMessage.style.display = 'none' // hides game over message

  drawTetromino() // restarts game
  gameState.timerId = setInterval(moveDown, GAME_TIMINGS[gameState.level])
  gameState.nextTetrominoIndex = rng()
  displayNextTetromino()
}

const pauseGame = () => {
  clearInterval(gameState.timerId)
  gameState.timerId = undefined
  gameState.isGamePaused = true
  scoreDisplay.textContent = 'paused'
}
