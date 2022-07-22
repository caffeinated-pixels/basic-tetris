import { gameState } from '../game-state'
import { instructionsDisplay } from '../dom/elements'

export const displayInstructions = (): void => {
  console.log('displayInfo')

  if (gameState.isGameOver === false) return

  console.log(instructionsDisplay.style.display === 'none')
  instructionsDisplay.style.display === 'none'
    ? (instructionsDisplay.style.display = 'flex')
    : (instructionsDisplay.style.display = 'none')
}
