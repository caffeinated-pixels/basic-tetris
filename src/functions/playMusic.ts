const audioUrl = new URL('../audio/robocop.mp3', import.meta.url)
const gameMusic = new Audio(audioUrl.href)
gameMusic.loop = true

export const playMusic = () => {
  gameMusic.paused === true ? gameMusic.play() : gameMusic.pause()
}
