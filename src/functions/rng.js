// RNG FUNCTION FOR CHOOSING A TETROMINO
import { TETROMINOS } from '../constants/'
export const rng = () => Math.floor(Math.random() * TETROMINOS.length)
