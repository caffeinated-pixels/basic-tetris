// RNG FUNCTION FOR CHOOSING A TETROMINO
import { TETROMINOS } from '../constants'
export const rng = () => Math.floor(Math.random() * TETROMINOS.length)

export const setFirstTetromino = (gameState) => {
  gameState.nextTetrominoIndex = rng() // selects nextup tetromino
  gameState.tetrominoIndex = rng() // selects current tetromino
  gameState.currentTetromino =
    TETROMINOS[gameState.tetrominoIndex][gameState.currentRotation] // selects 1st rotation of the tetromino
}
