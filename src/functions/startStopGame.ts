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

// TODO: refactor into smaller functions
export const startStopGame = (): void => {
  instructionsDisplay.style.display = 'none'

  if (gameState.isGameOver) {
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
  } else {
    // if !isGameOver, ie game is active or before starting 1st game
    if (gameState.timerId) {
      // if gameState.timerId truthy, ie not undefined/null
      clearInterval(gameState.timerId) // pauses game
      gameState.timerId = undefined
      gameState.isGamePaused = true
      scoreDisplay.textContent = 'paused'
    } else {
      gameState.isGamePaused = false
      scoreDisplay.textContent = `${gameState.score}`
      drawTetromino()
      gameState.timerId = setInterval(moveDown, GAME_TIMINGS[gameState.level]) // unpauses game
      displayNextTetromino()
    }
  }
}
