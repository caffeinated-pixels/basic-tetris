import { WIDTH } from './general'

/* THE TETROMINOS; each subarray is one of its 4 rotations
the values represent grid positions on the 10x18 grid; WIDTH = 10
so [1, WIDTH + 1, WIDTH * 2 + 1, 2] = grid positions 1, 11, 21, 2 */
export const J_TETROMINO = [
  [1, WIDTH + 1, WIDTH * 2 + 1, 2],
  [WIDTH, WIDTH + 1, WIDTH + 2, WIDTH * 2 + 2],
  [1, WIDTH + 1, WIDTH * 2 + 1, WIDTH * 2],
  [WIDTH, WIDTH * 2, WIDTH * 2 + 1, WIDTH * 2 + 2],
]

export const L_TETROMINO = [
  [0, 1, WIDTH + 1, WIDTH * 2 + 1],
  [WIDTH, WIDTH + 1, WIDTH + 2, WIDTH * 2],
  [1, WIDTH + 1, WIDTH * 2 + 1, WIDTH * 2 + 2],
  [WIDTH + 2, WIDTH * 2, WIDTH * 2 + 1, WIDTH * 2 + 2],
]

export const Z_TETROMINO = [
  [0, WIDTH, WIDTH + 1, WIDTH * 2 + 1],
  [WIDTH + 1, WIDTH + 2, WIDTH * 2, WIDTH * 2 + 1],
  [0, WIDTH, WIDTH + 1, WIDTH * 2 + 1],
  [WIDTH + 1, WIDTH + 2, WIDTH * 2, WIDTH * 2 + 1],
]

export const S_TETROMINO = [
  [2, WIDTH + 1, WIDTH + 2, WIDTH * 2 + 1],
  [WIDTH, WIDTH + 1, WIDTH * 2 + 1, WIDTH * 2 + 2],
  [2, WIDTH + 1, WIDTH + 2, WIDTH * 2 + 1],
  [WIDTH, WIDTH + 1, WIDTH * 2 + 1, WIDTH * 2 + 2],
]

export const T_TETROMINO = [
  [1, WIDTH, WIDTH + 1, WIDTH + 2],
  [1, WIDTH + 1, WIDTH + 2, WIDTH * 2 + 1],
  [WIDTH, WIDTH + 1, WIDTH + 2, WIDTH * 2 + 1],
  [1, WIDTH, WIDTH + 1, WIDTH * 2 + 1],
]

export const O_TETROMINO = [
  [0, 1, WIDTH, WIDTH + 1],
  [0, 1, WIDTH, WIDTH + 1],
  [0, 1, WIDTH, WIDTH + 1],
  [0, 1, WIDTH, WIDTH + 1],
]

export const I_TETROMINO = [
  [1, WIDTH + 1, WIDTH * 2 + 1, WIDTH * 3 + 1],
  [WIDTH, WIDTH + 1, WIDTH + 2, WIDTH + 3],
  [1, WIDTH + 1, WIDTH * 2 + 1, WIDTH * 3 + 1],
  [WIDTH, WIDTH + 1, WIDTH + 2, WIDTH + 3],
]

export const TETROMINOS = [
  J_TETROMINO,
  L_TETROMINO,
  Z_TETROMINO,
  S_TETROMINO,
  T_TETROMINO,
  O_TETROMINO,
  I_TETROMINO,
] // creates a nested array of all the tetrominos/rotations
