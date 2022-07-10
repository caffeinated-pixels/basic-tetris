import { WIDTH } from '../constants'
import { gameState } from '../game-state'

export const isAtRightEdge = (): boolean =>
  gameState.currentTetromino.some(
    (index) => (gameState.currentPosition + index) % WIDTH === WIDTH - 1
  )
