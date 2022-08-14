import { WIDTH, UP_NEXT_WIDTH } from './general'

/* THE TETROMINOS; each subarray is one of its 4 rotations
the values represent grid positions on the 10x18 grid; width = 10
so [1, width + 1, width * 2 + 1, 2] = grid positions 1, 11, 21, 2 */

type tetrominoContructor = (width: number) => number[][]

const J_TETROMINO: tetrominoContructor = (width) => [
  [1, width + 1, width * 2 + 1, 2],
  [width, width + 1, width + 2, width * 2 + 2],
  [1, width + 1, width * 2 + 1, width * 2],
  [width, width * 2, width * 2 + 1, width * 2 + 2],
]

const L_TETROMINO: tetrominoContructor = (width) => [
  [0, 1, width + 1, width * 2 + 1],
  [width, width + 1, width + 2, width * 2],
  [1, width + 1, width * 2 + 1, width * 2 + 2],
  [width + 2, width * 2, width * 2 + 1, width * 2 + 2],
]

const Z_TETROMINO: tetrominoContructor = (width) => [
  [0, width, width + 1, width * 2 + 1],
  [width + 1, width + 2, width * 2, width * 2 + 1],
  [0, width, width + 1, width * 2 + 1],
  [width + 1, width + 2, width * 2, width * 2 + 1],
]

const S_TETROMINO: tetrominoContructor = (width) => [
  [2, width + 1, width + 2, width * 2 + 1],
  [width, width + 1, width * 2 + 1, width * 2 + 2],
  [2, width + 1, width + 2, width * 2 + 1],
  [width, width + 1, width * 2 + 1, width * 2 + 2],
]

const T_TETROMINO: tetrominoContructor = (width) => [
  [1, width, width + 1, width + 2],
  [1, width + 1, width + 2, width * 2 + 1],
  [width, width + 1, width + 2, width * 2 + 1],
  [1, width, width + 1, width * 2 + 1],
]

const O_TETROMINO: tetrominoContructor = (width) => [
  [0, 1, width, width + 1],
  [0, 1, width, width + 1],
  [0, 1, width, width + 1],
  [0, 1, width, width + 1],
]

const I_TETROMINO: tetrominoContructor = (width) => [
  [1, width + 1, width * 2 + 1, width * 3 + 1],
  [width, width + 1, width + 2, width + 3],
  [1, width + 1, width * 2 + 1, width * 3 + 1],
  [width, width + 1, width + 2, width + 3],
]

export const TETROMINOS = [
  J_TETROMINO(WIDTH),
  L_TETROMINO(WIDTH),
  Z_TETROMINO(WIDTH),
  S_TETROMINO(WIDTH),
  T_TETROMINO(WIDTH),
  O_TETROMINO(WIDTH),
  I_TETROMINO(WIDTH),
] // creates a nested array of all the tetrominos/rotations

// Tetrominos without rotations; adjusted for 4x4 grid
export const UP_NEXT_TETROMINOS = [
  J_TETROMINO(UP_NEXT_WIDTH)[0],
  L_TETROMINO(UP_NEXT_WIDTH)[0],
  Z_TETROMINO(UP_NEXT_WIDTH)[0],
  S_TETROMINO(UP_NEXT_WIDTH)[0],
  T_TETROMINO(UP_NEXT_WIDTH)[0],
  O_TETROMINO(UP_NEXT_WIDTH)[0],
  I_TETROMINO(UP_NEXT_WIDTH)[0],
]
