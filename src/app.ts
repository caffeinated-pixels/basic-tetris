import { gameState } from './game-state'

import { startBtn, infoBtn } from './dom/elements'

import {
  arrowKeyControls,
  preventScrolling,
  startStopGame,
  displayInfo,
} from './functions/'

document.addEventListener('keydown', arrowKeyControls)
window.addEventListener('keydown', preventScrolling)
startBtn.addEventListener('click', startStopGame)
infoBtn.addEventListener('click', displayInfo)
