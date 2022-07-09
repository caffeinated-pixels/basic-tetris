interface gameState {
  timerId: number | null
  squaresRemoved: HTMLElement[] | null
  squares: HTMLElement[]
  hiscore: number
  score: number
  level: number
  lines: number
  linesLevel: number
  isGameOver: boolean
  isGamePaused: boolean
  currentPosition: number
  currentRotation: number
  currentTetromino: number[] | null
  tetrominoIndex: number
  nextTetrominoIndex: number
}

const initialState: gameState = {
  timerId: null, // for stopping the timer
  squaresRemoved: null, // for storing cleared lines/rows
  squares: Array.from(document.querySelectorAll('.grid div')),
  hiscore: 0, // for hiscore html display
  score: 0, // for score html display
  level: 0, // for level html display
  lines: 0, // for lines html display
  linesLevel: 0, // for incrementing new levels
  isGameOver: false, // change to true when game over, man!
  isGamePaused: true, // game starts off paused
  currentPosition: 4, // staring position of tetromino
  currentRotation: 0, // starting rotation of tetromino
  currentTetromino: null, // store tetromino in current rotation
  tetrominoIndex: 0, // store current tetromino index
  nextTetrominoIndex: 0, // store next tetromino index
}

/* sqaure creates an array of the 190 divs from .grid. Without Array.from() it creates
a NodeList array that doesn't allow us to splice cleared lines */

export const gameState: gameState = {
  ...initialState,
}
