import { gameState } from './game-state'

import { startBtn } from './dom/elements'

import {
  arrowKeyControls,
  preventScrolling,
  setFirstTetromino,
  startStopGame,
} from './functions/'

setFirstTetromino(gameState)

document.addEventListener('keydown', arrowKeyControls)
window.addEventListener('keydown', preventScrolling)

if (startBtn) startBtn.addEventListener('click', startStopGame)
