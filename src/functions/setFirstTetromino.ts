// RNG FUNCTION FOR CHOOSING A TETROMINO
import { TETROMINOS } from '../constants'
export const rng = (): number => Math.floor(Math.random() * TETROMINOS.length)

export const setFirstTetromino = (gameState): void => {
  gameState.currentTetromino =
    TETROMINOS[gameState.tetrominoIndex][gameState.currentRotation] // selects 1st rotation of the tetromino
}
