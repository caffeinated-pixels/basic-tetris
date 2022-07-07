import { WIDTH } from '../constants'
import { gameState } from '../game-state'

export const isAtLeftEdge = () =>
  gameState.currentTetromino.some(
    (index) => (gameState.currentPosition + index) % WIDTH === 0
  )
