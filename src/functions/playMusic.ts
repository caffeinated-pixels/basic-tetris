const audioUrl = new URL('../audio/robocop.mp3', import.meta.url)

const gameMusic = new Audio(audioUrl.href)
gameMusic.loop = true

export const playMusic = () => {
  console.log('play music')
  gameMusic.play()
}
