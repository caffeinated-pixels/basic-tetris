import { gameState } from '../game-state'
import { WIDTH, TETROMINOS } from '../constants'
import { isAtLeftEdge, isAtRightEdge, undrawTetromino, drawTetromino } from './'

// prevents t,l,j,i tetrominos rotating through the edge onto the other side of the grid!!!
const checkRotatedPosition = (pos?: number): void => {
  pos = pos || gameState.currentPosition // gets current pos then checks if the piece is near the left side
  if ((pos + 1) % WIDTH < 4) {
    // +1 to compensate for possible difference between squares & pos
    if (isAtRightEdge()) {
      // check if it has rotated through to right side
      gameState.currentPosition += 1 // if so, add 1 to push it back
      checkRotatedPosition(pos) // check again as iTet might need +1 adjustment to pos
    }
  } else if (pos % WIDTH > 5) {
    // checks if tetromino near right side
    if (isAtLeftEdge()) {
      // checks if it has rotated through to left side
      gameState.currentPosition -= 1 // if so, minus 1 to push it back
      checkRotatedPosition(pos) // check again as iTet might need +1 adjustment to pos
    }
  }
}

export const rotateTetromino = () => {
  // can cause t,l,j,i to go through wall at edge (see above)
  undrawTetromino()
  gameState.currentRotation++
  if (gameState.currentRotation === gameState.currentTetromino.length) {
    // resets rotation when gets to array end
    gameState.currentRotation = 0
  }
  gameState.currentTetromino =
    TETROMINOS[gameState.tetrominoIndex][gameState.currentRotation] // set to new rotation
  checkRotatedPosition() // checks if tetromino has rotated through the side of grid
  drawTetromino() // redraws tetromino
}
