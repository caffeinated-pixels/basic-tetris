import { gameState } from '../game-state'
import { GAME_TIMINGS } from '../constants'
import { scoreDisplay, levelDisplay, linesDisplay, grid } from '../dom/elements'
import { displayNextTetromino, drawTetromino, rng, moveDown } from './'

// TODO: refactor into smaller functions
export const startStopGame = (): void => {
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

    if (grid.firstChild) grid.removeChild(grid.firstChild) // remove game over message
    gameState.squares.forEach((cell) => grid.appendChild(cell)) // redraws grid
    grid.style.backgroundColor = '#ffd37b' // resets background color
    for (let i = 0; i < 180; i++) {
      // reset grid squares color
      gameState.squares[i].style.backgroundColor = ''
    }

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
