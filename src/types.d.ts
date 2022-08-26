export interface GameState {
  timerId: number | undefined
  squaresRemoved: HTMLDivElement[] | null
  squares: HTMLDivElement[]
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
