import { WIDTH } from '../constants'
import { grid, levelDisplay, linesDisplay, scoreDisplay } from '../dom/elements'
import { gameState } from '../game-state'

/* it checks every row of the grid for completed lines; these are then removed and
added back to the top of the grid. We also remove the .taken and .tetromino classes */
export const addScore = () => {
  let lineCount = 0
  for (let i = 0; i < 179; i += WIDTH) {
    const row = [
      i,
      i + 1,
      i + 2,
      i + 3,
      i + 4,
      i + 5,
      i + 6,
      i + 7,
      i + 8,
      i + 9,
    ]
    // creates an array of div/cell nums for each grid row

    if (
      row.every((index) => gameState.squares[index].classList.contains('taken'))
    ) {
      // checks if every div in row has class .taken
      lineCount += 1 // adds 1 to the local number-of-lines variable
      gameState.linesLevel += 1 // adds 1 to the global number of lines

      gameState.lines += 1 // for html display
      linesDisplay.textContent = `${gameState.lines}` // update display

      row.forEach((index) => {
        gameState.squares[index].classList.remove('taken', 'tetromino') // clears the lines by removing classes
        gameState.squares[index].style.backgroundColor = '' // removes background COLORS from cleared row
      })
      gameState.squaresRemoved = gameState.squares.splice(i, WIDTH) // removes row, stores in gameState.squaresRemoved

      gameState.squares.unshift(...gameState.squaresRemoved) // adds gameState.squaresRemoved to the top of the grid/array

      grid?.replaceChildren(...gameState.squares) // replaces grid divs using squares array
    }
  }

  // based on Gameboy scoring system
  if (lineCount === 1) gameState.score += 40 * (gameState.level + 1)
  if (lineCount === 2) gameState.score += 100 * (gameState.level + 1)
  if (lineCount === 3) gameState.score += 300 * (gameState.level + 1)
  if (lineCount === 4) gameState.score += 1200 * (gameState.level + 1)
  scoreDisplay.textContent = `${gameState.score}`

  // level increment
  if (gameState.linesLevel >= 10 && gameState.level < 20) {
    gameState.level += 1 // increments global variable
    gameState.linesLevel -= 10 // resets global variable & carries over extra lines
  }
  levelDisplay.textContent = `${gameState.level}` // updates html display
}
