import { gameState } from '../game-state'
import { GAME_TIMINGS } from '../constants'
import { moveDown } from './'

export const startGameTimer = () => {
  gameState.timerId = setInterval(moveDown, GAME_TIMINGS[gameState.level])
}

export const stopGameTimer = () => {
  clearInterval(gameState.timerId)
}
