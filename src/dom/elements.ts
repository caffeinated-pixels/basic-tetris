export const grid: HTMLElement = document.querySelector('.game-grid')! // selects specified element
export const hiscoreDisplay: HTMLElement = document.querySelector('#hiscore')! // targets html ids
export const scoreDisplay: HTMLElement = document.querySelector('#score')!
export const linesDisplay: HTMLElement = document.querySelector('#lines')!
export const levelDisplay: HTMLElement = document.querySelector('#level')!
export const startBtn: HTMLElement = document.querySelector('#start-button')!
export const nextTetrominoDisplay: NodeListOf<HTMLElement> =
  document.querySelectorAll('.nextup-grid div')!
// creates an array of the 16 divs in the mini-grid
