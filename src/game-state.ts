import { rng } from './functions/'
import type { GameState } from './types'
import { TETROMINOS } from './constants'
import { hiscoreDisplay } from './dom/elements'

const getHiscoreFromLocalStorage = () => {
  const hiscore = localStorage.tetrisHiscore
    ? parseInt(localStorage.tetrisHiscore)
    : 0

  hiscoreDisplay.textContent = `${hiscore}`
  return hiscore
}

const initializeState = (): GameState => {
  const tetrominoIndex = rng()
  const nextTetrominoIndex = rng()
  const currentTetromino = TETROMINOS[tetrominoIndex][0]

  return {
    timerId: undefined, // for stopping the timer
    squaresRemoved: null, // for storing cleared lines/rows
    squares: Array.from(document.querySelectorAll('.game-grid div')),
    hiscore: getHiscoreFromLocalStorage(), // for hiscore html display
    score: 0, // for score html display
    level: 0, // for level html display
    lines: 0, // for lines html display
    linesLevel: 0, // for incrementing new levels
    isGameOver: false, // change to true when game over, man!
    isGamePaused: true, // game starts off paused
    currentPosition: 4, // staring position of tetromino
    currentRotation: 0, // starting rotation of tetromino
    currentTetromino, // store tetromino in current rotation
    tetrominoIndex, // store current tetromino index
    nextTetrominoIndex, // store next tetromino index
  }
}

export const gameState = initializeState()
