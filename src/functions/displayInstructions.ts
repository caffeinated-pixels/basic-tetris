import { gameState } from '../game-state'
import { instructionsDisplay } from '../dom/elements'

export const displayInstructions = (): void => {
  if (gameState.isGamePaused === false) return

  if (instructionsDisplay.style.display === '') {
    // this property will initially be an empty string
    instructionsDisplay.style.display = 'flex'
  } else if (instructionsDisplay.style.display === 'none') {
    instructionsDisplay.style.display = 'flex'
  } else {
    instructionsDisplay.style.display = 'none'
  }
}
