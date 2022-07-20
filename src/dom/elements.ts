export const grid: HTMLElement = document.querySelector('.game-grid')! // selects specified element
export const hiscoreDisplay: HTMLElement = document.querySelector('#hiscore')! // targets html ids
export const scoreDisplay: HTMLElement = document.querySelector('#score')!
export const linesDisplay: HTMLElement = document.querySelector('#lines')!
export const levelDisplay: HTMLElement = document.querySelector('#level')!
export const startBtn: HTMLElement = document.querySelector('#start-button')!
export const infoBtn: HTMLElement = document.querySelector('#info-button')!
export const musicBtn: HTMLElement = document.querySelector('#music-button')!
export const gameOverMessage: HTMLElement =
  document.querySelector('#game-over')!
export const nextTetrominoDisplay: NodeListOf<HTMLElement> =
  document.querySelectorAll('.nextup-grid div')!
// creates an array of the 16 divs in the mini-grid
