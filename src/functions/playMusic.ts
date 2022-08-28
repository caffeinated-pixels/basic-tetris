import { musicBtnIcon } from '../dom/elements'

const audioUrl = new URL('../audio/robocop.mp3', import.meta.url)
const gameMusic = new Audio(audioUrl.href)
gameMusic.loop = true

const musicBtnIconStrings = ['music_note', 'music_off']

export const playMusic = () => {
  if (gameMusic.paused === true) {
    gameMusic.play()
    musicBtnIcon.textContent = musicBtnIconStrings[1]
  } else {
    gameMusic.pause()
    musicBtnIcon.textContent = musicBtnIconStrings[0]
  }
}
