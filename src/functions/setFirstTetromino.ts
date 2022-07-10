import type { GameState } from '../types'
import { TETROMINOS } from '../constants'
export const rng = (): number => Math.floor(Math.random() * TETROMINOS.length)

export const setFirstTetromino = (gameState: GameState): void => {
  gameState.currentTetromino =
    TETROMINOS[gameState.tetrominoIndex][gameState.currentRotation] // selects 1st rotation of the tetromino
}
