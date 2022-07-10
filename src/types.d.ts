export interface GameState {
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
  currentTetromino: number[]
  tetrominoIndex: number
  nextTetrominoIndex: number
}
