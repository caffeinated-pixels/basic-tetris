const initialState = {
  timerId: null, // for stopping the timer
  squaresRemoved: null, // for storing cleared lines/rows
  hiscore: 0, // for hiscore html display
  score: 0, // for score html display
  level: 0, // for level html display
  lines: 0, // for lines html display
  linesLevel: 0, // for incrementing new levels
  isGameOver: false, // change to true when game over, man!
  isGamePaused: true, // game starts off paused
  currentPosition: 4, // staring position of tetromino
  currentRotation: 0, // starting rotation of tetromino
}

export const gameState = {
  ...initialState,
}
