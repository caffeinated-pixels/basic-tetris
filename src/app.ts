import { gameState } from './game-state'

import { startBtn } from './dom/elements'

import { arrowKeyControls, preventScrolling, startStopGame } from './functions/'

document.addEventListener('keydown', arrowKeyControls)
window.addEventListener('keydown', preventScrolling)
startBtn.addEventListener('click', startStopGame)
