import { gameState } from '../game-state'
import { instructionsDisplay } from '../dom/elements'

export const displayInstructions = (): void => {
  if (gameState.isGamePaused === false) return

  instructionsDisplay.style.display === 'none'
    ? (instructionsDisplay.style.display = 'flex')
    : (instructionsDisplay.style.display = 'none')
}
