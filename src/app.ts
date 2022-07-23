import { startBtn, infoBtn, musicBtn, dPad } from './dom/elements'

import {
  arrowKeyControls,
  preventScrolling,
  startStopGame,
  displayInstructions,
  playMusic,
  dpadControls,
} from './functions/'

document.addEventListener('keydown', arrowKeyControls)
window.addEventListener('keydown', preventScrolling)
startBtn.addEventListener('click', startStopGame)
infoBtn.addEventListener('click', displayInstructions)
musicBtn.addEventListener('click', playMusic)
dPad.addEventListener('click', dpadControls)
