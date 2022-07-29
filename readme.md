# Tetris

I built my [Tetris game](https://caffeinated-tetris.netlify.app/) back in the summer of 2020 after following the [freeCodeCamp tutorial by Ania Kubrow](https://www.youtube.com/watch?v=rAUn1Lom6dw).

I learned a lot from that tutorial and had fun customising and expanding upon the functionality of Kubrow's very simple Tetris game.

Some of the features I added include:

- hi-score display
- cleared lines count
- game restart function
- pause functionality
- additional tetrominoes (i.e. all seven shapes)
- increasing speed levels based on the timings of the classic Nintendo Gameboy Tetris
- a more complex scoring system, also based on the Gameboy version of Tetris
- some awesome chiptune music (which may get annoying after a while!)

More recently (summer 2022), I revised my Tetris game to see how I could improve it. As a learning exercise, I set up it with the [webapp bundler Parcel,](https://parceljs.org/) split the JavaScript into modules and converted it to TypeScript.

Other changes I made include:

- refactored to improve readability and performance (still needs more work!!!)
- reworked the layout to be responsive and work on mobile displays
- added a d-pad for playing without a keyboard
- minor bug fixing

There are still some more bug fixing and performance improvements to be done and I’d like to add touch screen controls. I also want to rework the randomiser to change the distribution of tetrominoes to be more in line with the Gameboy version (at the moment they all have an equal chance of being selected). And I want the player to be able to slot the tetrominoes into horizontal gaps.

By the way, the music was composed by the brilliant Jonathon Dunn for the [ZX Spectrum version of the 1988 video game RoboCop](https://youtu.be/9_JguaRYkpg).
