import { startBtn, infoBtn, musicBtn } from './dom/elements'

import {
  arrowKeyControls,
  preventScrolling,
  startStopGame,
  displayInstructions,
  playMusic,
} from './functions/'

document.addEventListener('keydown', arrowKeyControls)
window.addEventListener('keydown', preventScrolling)
startBtn.addEventListener('click', startStopGame)
infoBtn.addEventListener('click', displayInstructions)
musicBtn.addEventListener('click', playMusic)
