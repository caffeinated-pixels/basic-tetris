export const rng = (): number => setTetrominoIndex(Math.random())

const setTetrominoIndex = (random: number) => {
  if (random < 0.107) {
    return 0 // L
  } else if (random < 0.245) {
    return 1 // J
  } else if (random < 0.382) {
    return 2 // I
  } else if (random < 0.519) {
    return 3 // Z
  } else if (random < 0.68) {
    return 4 // O
  } else if (random < 0.841) {
    return 5 // S
  } else {
    return 6 // T
  }
}

/* 
The GameBoy randomizer is more complex than this, but we can
approximate the relative tetromino frequencies:

    L: 10.7 %
    J, I, Z: 13.7 %
    O, S, T: 16.1 % 

    https://harddrop.com/wiki/Tetris_(Game_Boy)
*/
