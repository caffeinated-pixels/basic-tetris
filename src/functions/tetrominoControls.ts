import { gameState } from '../game-state'
import { scoreDisplay } from '../dom/elements'
import { WIDTH } from '../constants'
import {
  drawTetromino,
  undrawTetromino,
  stopTetromino,
  isAtLeftEdge,
  isAtRightEdge,
  rotateTetromino,
} from './'

export const moveDown = (hasUserInitiated?: boolean) => {
  if (hasUserInitiated) {
    gameState.score += 1 // softdrop score, 1pt per row
    scoreDisplay.textContent = `${gameState.score}` // update html score display
  }

  undrawTetromino() // remove squares
  gameState.currentPosition += WIDTH // move down 1 row
  drawTetromino() // redraw squares in new positions
  stopTetromino() // checks what's below the tetromino
}

/* won't move left if at grid edge or there is a blockage (.taken);
modulus calc will only eval to 0 if in grid position 0, 10, 20, 30, etc */
const moveLeft = () => {
  undrawTetromino() // remove the squares
  if (!isAtLeftEdge()) gameState.currentPosition -= 1 // moves tetromino 1 column to the left

  // checks if any grid divs have the class .taken; ie whether it bumps into another tetromino
  if (
    gameState.currentTetromino.some((index) =>
      gameState.squares[gameState.currentPosition + index].classList.contains(
        'taken'
      )
    )
  ) {
    gameState.currentPosition += 1 // moves tetromino back 1 to the right
  }

  drawTetromino() // redraw tetromino in new position
}
/* won't move right if at edge or there is a blockage (.taken);
modulus calc will only eval to 9 (ie 10-1=9) if in grid position 9, 19, 29, 39, etc */
const moveRight = (): void => {
  undrawTetromino() // remove the squares
  if (!isAtRightEdge()) gameState.currentPosition += 1 // moves tetromino 1 column to the right

  if (
    gameState.currentTetromino.some((index) =>
      gameState.squares[gameState.currentPosition + index].classList.contains(
        'taken'
      )
    )
  ) {
    gameState.currentPosition -= 1 // moves tetromino back 1 to the left
  }

  drawTetromino()
}

export const arrowKeyControls = (e: KeyboardEvent): void => {
  if (!gameState.isGameOver && !gameState.isGamePaused) {
    // won't excute if game is over or paused
    if (e.key === 'ArrowLeft') moveLeft()
    else if (e.key === 'ArrowUp') rotateTetromino() // ArrowUp, obviously!
    else if (e.key === 'ArrowRight') moveRight()
    else if (e.key === 'ArrowDown') moveDown(true)
  }
}

export const dpadControls = (e: MouseEvent): void => {
  const target = e.target as HTMLElement // event objects can be other types, so we need an assertion

  if (!gameState.isGameOver && !gameState.isGamePaused) {
    // won't excute if game is over or paused
    if (target.dataset.id === 'left') moveLeft()
    else if (target.dataset.id === 'up') rotateTetromino()
    else if (target.dataset.id === 'right') moveRight()
    else if (target.dataset.id === 'down') moveDown(true)
  }
}
