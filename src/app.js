const grid = document.querySelector('.grid'); // selects specified element

let squares = Array.from(document.querySelectorAll('.grid div'));
/* creates an array of the 190 divs from .grid. Without Array.from() it creates
a NodeList array that doesn't allow us to splice cleared lines */

const hiscoreDisplay = document.querySelector('#hiscore'); // targets html ids
const scoreDisplay = document.querySelector('#score');
const linesDisplay = document.querySelector('#lines');
const levelDisplay = document.querySelector('#level');
const startBtn = document.querySelector('#start-button');

const width = 10; // for plotting out shapes on the grid (1 row = 10 cells)
let timerId; // leave undefined until game starts
let squaresRemoved; // for storing cleared lines/rows

let hiscore = 0; // for hiscore html display
let score = 0; // for score html display
let level = 0; // for level html display
let lines = 0; // for lines html display
let linesLevel = 0; // for incrementing new levels
let isGameOver = false; // change to true when game over, man!
let isGamePaused = true; // game starts off paused

// Timings (ms) based on Gameboy version
const gameTimings = [887.33, 820.36, 753.39, 686.42, 619.45, 552.49, 468.78, 368.32, 284.61, 184.16, 167.42, 150.68, 133.94, 117.19, 100.45, 100.45, 83.71, 83.71, 66.97, 66.97, 50.23];

// colors same order as in theTetrominos array
const colors = ['#01e6ff', '#ff0000', '#ff00ff', '#ffa508', '#63ff63', '#ffff00', '#ff7b31'];

let currentPosition = 4; // staring position of tetromino
let currentRotation = 0; // starting rotation of tetromino

/* THE TETROMINOS; each subarray is one of its 4 rotations
the values represent grid positions on the 10x18 grid; width = 10
so [1, width + 1, width * 2 + 1, 2] = grid positions 1, 11, 21, 2 */
const jTetromino = [
  [1, width + 1, width * 2 + 1, 2],
  [width, width + 1, width + 2, width * 2 + 2],
  [1, width + 1, width * 2 + 1, width * 2],
  [width, width * 2, width * 2 + 1, width * 2 + 2]
];

const lTetromino = [
  [0, 1, width + 1, width * 2 + 1],
  [width, width + 1, width + 2, width * 2],
  [1, width + 1, width * 2 + 1, width * 2 + 2],
  [width + 2, width * 2, width * 2 + 1, width * 2 + 2]
];

const zTetromino = [
  [0, width, width + 1, width * 2 + 1],
  [width + 1, width + 2, width * 2, width * 2 + 1],
  [0, width, width + 1, width * 2 + 1],
  [width + 1, width + 2, width * 2, width * 2 + 1]
];

const sTetromino = [
  [2, width + 1, width + 2, width * 2 + 1],
  [width, width + 1, width * 2 + 1, width * 2 + 2],
  [2, width + 1, width + 2, width * 2 + 1],
  [width, width + 1, width * 2 + 1, width * 2 + 2]
];

const tTetromino = [
  [1, width, width + 1, width + 2],
  [1, width + 1, width + 2, width * 2 + 1],
  [width, width + 1, width + 2, width * 2 + 1],
  [1, width, width + 1, width * 2 + 1]
];

const oTetromino = [
  [0, 1, width, width + 1],
  [0, 1, width, width + 1],
  [0, 1, width, width + 1],
  [0, 1, width, width + 1]
];

const iTetromino = [
  [1, width + 1, width * 2 + 1, width * 3 + 1],
  [width, width + 1, width + 2, width + 3],
  [1, width + 1, width * 2 + 1, width * 3 + 1],
  [width, width + 1, width + 2, width + 3]
];

const theTetrominoes = [jTetromino, lTetromino, zTetromino, sTetromino, tTetromino, oTetromino, iTetromino]; // creates a nested array of all the tetrominos/rotations

// RNG FUNCTION FOR CHOOSING A TETROMINO
const rng = () => Math.floor((Math.random() * theTetrominoes.length));
let nextRandom = rng(); // selects nextup tetromino
// const rng = () => 4; // for debugging!
// let nextRandom = 4; // for debugging!
let random = rng(); // selects current tetromino
let current = theTetrominoes[random][currentRotation]; // selects 1st rotation of the tetromino

/* for checking whether tertromino is at left/right edge of grid
modulus calc will evaluate 0 for left edge and 9 for right edge */
const isAtLeftEdge = () => current.some(index => (currentPosition + index) % width === 0);
const isAtRightEdge = () => current.some(index => (currentPosition + index) % width === (width - 1));

// DRAW THE TETROMINO
// we "draw" the shapes by colouring in the corresponding grid divs with CSS styling
function draw () {
  current.forEach(index => {
    squares[currentPosition + index].classList.add('tetromino');
    // uses the css class .tetromino to style the grid squares
    squares[currentPosition + index].style.backgroundColor = colors[random];
    // sets the background-color for the tertromino
  });
}

// UNDRAW THE TETROMINO
// to move the shapes, we have to "undraw" them first and then redraw in the new position
function undraw () {
  current.forEach(index => {
    squares[currentPosition + index].classList.remove('tetromino'); // removes .tetromino class
    squares[currentPosition + index].style.backgroundColor = ''; // removes the background-color
  });
}

// ASSIGN FUNCTIONS TO KEYCODES
// we control the tertrominos with the arrow keys
function control (e) {
  if (!isGameOver && !isGamePaused) { // won't excute if game is over or paused
    if (e.keyCode === 37) moveLeft();
    else if (e.keyCode === 38) rotate(); // ArrowUp, obviously!
    else if (e.keyCode === 39) moveRight();
    else if (e.keyCode === 40) {
      score += 1; // softdrop score, 1pt per row
      scoreDisplay.innerHTML = score; // update html score display
      moveDown();
    }
  }
}
document.addEventListener('keydown', control); // invokes control() on keydown

window.addEventListener('keydown', function (e) {
  if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) e.preventDefault();
}, false); // prevents scrolling of window when using space & arrow keys

// MOVE DOWN FUNCTION
function moveDown () {
  undraw(); // remove squares
  currentPosition += width; // move down 1 row
  draw(); // redraw squares in new positions
  freeze(); // checks what's below the tetromino
}

// FREEZE FUNCTION
// checks for "taken" squares below the current tetromino
function freeze () {
  if (current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
    // checks the next grid square down for the class .taken
    current.forEach(index => squares[currentPosition + index].classList.add('taken'));
    // if true, adds to the class .taken to the grid divs & movement stops

    // we then start a new tetromino falling from the top
    random = nextRandom;
    nextRandom = rng(); // selects new tetromino
    current = theTetrominoes[random][currentRotation];
    currentPosition = 4; // resets to starting position
    draw(); // draw new tetromino
    displayShape(); // to display next tetromino in mini-grid
    addScore(); // checks for completed lines when tertrominos stack
    gameOver(); // checks for game over condition
  }
}

// MOVE LEFT FUNCTION
/* won't move left if at grid edge or there is a blockage (.taken);
modulus calc will only eval to 0 if in grid position 0, 10, 20, 30, etc */
function moveLeft () {
  undraw(); // remove the squares
  if (!isAtLeftEdge()) currentPosition -= 1; // moves tetromino 1 column to the left

  // checks if any grid divs have the class .taken; ie whether it bumps into another tetromino
  if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
    currentPosition += 1; // moves tetromino back 1 to the right
  }

  draw(); // redraw tetromino in new position
}

// MOVE RIGHT FUNCTION
/* won't move right if at edge or there is a blockage (.taken);
modulus calc will only eval to 9 (ie 10-1=9) if in grid position 9, 19, 29, 39, etc */
function moveRight () {
  undraw(); // remove the squares
  if (!isAtRightEdge()) currentPosition += 1; // moves tetromino 1 column to the right

  if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
    currentPosition -= 1; // moves tetromino back 1 to the left
  }

  draw();
}

// FUNCTION FOR CORRECTING ROTATION BUG
// prevents t,l,j,i tetrominos rotating through the edge onto the other side of the grid!!!
function checkRotatedPosition (pos) {
  pos = pos || currentPosition; // gets current pos then checks if the piece is near the left side
  if ((pos + 1) % width < 4) { // +1 to compensate for possible difference between squares & pos
    if (isAtRightEdge()) { // check if it has rotated through to right side
      currentPosition += 1; // if so, add 1 to push it back
      checkRotatedPosition(pos); // check again as iTet might need +1 adjustment to pos
    }
  } else if (pos % width > 5) { // checks if tetromino near right side
    if (isAtLeftEdge()) { // checks if it has rotated through to left side
      currentPosition -= 1; // if so, minus 1 to push it back
      checkRotatedPosition(pos); // check again as iTet might need +1 adjustment to pos
    }
  }
}

// ROTATE TETROMINO FUNCTION
function rotate () { // can cause t,l,j,i to go through wall at edge (see above)
  undraw();
  currentRotation++;
  if (currentRotation === current.length) { // resets rotation when gets to array end
    currentRotation = 0;
  }
  current = theTetrominoes[random][currentRotation]; // set to new rotation
  checkRotatedPosition(); // checks if tetromino has rotated through the side of grid
  draw(); // redraws tetromino
}

// DISPLAYING NEXT TETROMINO IN THE MINI-GRID
const displaySquares = document.querySelectorAll('.mini-grid div');
// creates an array of the 16 divs in the mini-grid; we don't need Array.from() here
const displayWidth = 4; // each row is only 4 wide
const displayIndex = 0; // reference position on grid; top-left corner

// Tetrominos without rotations; adjusted for 4x4 grid
const upNextTetrominoes = [
  [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 2], // jTetromino
  [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 2 + 2], // lTetromino
  [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1], // zTetromino
  [2, displayWidth + 1, displayWidth + 2, displayWidth * 2 + 1], // sTetromino
  [1, displayWidth, displayWidth + 1, displayWidth + 2], // tTetromino
  [0, 1, displayWidth, displayWidth + 1], // oTetromino
  [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1] // iTetromino
];

function displayShape () { // displays next tetromino in the mini-grid
  displaySquares.forEach(square => {
    square.classList.remove('tetromino'); // clears the mini-grid
    square.style.backgroundColor = ''; // remove color
  });
  upNextTetrominoes[nextRandom].forEach(index => { // draws next tetromino
    displaySquares[displayIndex + index].classList.add('tetromino');
    displaySquares[displayIndex + index].style.backgroundColor = colors[nextRandom];
  });
}

// START/PAUSE BTN FUNCTIONALITY
startBtn.addEventListener('click', () => {
  if (isGameOver) { // reset values if game over, man!
    score = 0;
    scoreDisplay.innerHTML = score;
    level = 0;
    levelDisplay.innerHTML = level;
    lines = 0;
    linesDisplay.innerHTML = lines;
    linesLevel = 0;
    isGameOver = false;
    isGamePaused = false;

    grid.removeChild(grid.firstChild); // remove game over message
    squares.forEach(cell => grid.appendChild(cell)); // redraws grid
    grid.style.backgroundColor = '#ffd37b'; // resets background color
    for (let i = 0; i < 180; i++) { // reset grid squares color
      squares[i].style.backgroundColor = '';
    }

    draw(); // restarts game
    timerId = setInterval(moveDown, gameTimings[level]);
    nextRandom = rng();
    displayShape();
  } else { // if !isGameOver, ie game is active or before starting 1st game
    if (timerId) { // if timerId truthy, ie not undefined/null
      clearInterval(timerId); // pauses game
      timerId = null;
      isGamePaused = true;
      scoreDisplay.innerHTML = 'paused';
    } else {
      isGamePaused = false;
      scoreDisplay.innerHTML = score;
      draw();
      timerId = setInterval(moveDown, gameTimings[level]); // unpauses game
      displayShape();
    }
  }
});

/* ADD SCORE FUNCTION
it checks every row of the grid for completed lines; these are then removed and
added back to the top of the grid. We also remove the .taken and .tetromino classes */
function addScore () {
  let lineCount = 0;
  for (let i = 0; i < 179; i += width) {
    const row = [i, i + 1, i + 2, i + 3, i + 4, i + 5, i + 6, i + 7, i + 8, i + 9];
    // creates an array of div/cell nums for each grid row

    if (row.every(index => squares[index].classList.contains('taken'))) {
      // checks if every div in row has class .taken
      lineCount += 1; // adds 1 to the local number-of-lines variable
      linesLevel += 1; // adds 1 to the global number of lines

      lines += 1; // for html display
      linesDisplay.innerHTML = lines; // update display

      row.forEach(index => {
        squares[index].classList.remove('taken', 'tetromino'); // clears the lines by removing classes
        squares[index].style.backgroundColor = ''; // removes background colors from cleared row
      });
      squaresRemoved = squares.splice(i, width); // removes row, stores in squaresRemoved
      squares = squaresRemoved.concat(squares); // adds squaresRemoved to the top of the grid/array
      squares.forEach(cell => grid.appendChild(cell)); // replaces each grid div using squares array
    }
  }

  // based on Gameboy scoring system
  if (lineCount === 1) score += 40 * (level + 1);
  if (lineCount === 2) score += 100 * (level + 1);
  if (lineCount === 3) score += 300 * (level + 1);
  if (lineCount === 4) score += 1200 * (level + 1);
  scoreDisplay.innerHTML = score;

  // level increment
  if (linesLevel >= 10 && level < 20) {
    level += 1; // increments global variable
    linesLevel -= 10; // resets global variable & carries over extra lines
  }
  levelDisplay.innerHTML = level; // updates html display
}

/* GAME OVER CONDITION
checks if any of the squares in the tetromino starting position are taken */
function gameOver () {
  if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
    isGameOver = true;

    for (let i = 0; i < 180; i++) {
      squares[i].classList.remove('taken'); // removes .taken class from each visible div
      squares[i].classList.remove('tetromino'); // removes .tetromino class
    }

    while (grid.firstChild) {
      grid.removeChild(grid.firstChild); // removes all grid divs from HTML document
    }

    grid.style.backgroundColor = '#b59aef'; // game over background-color
    grid.innerHTML = '<div class="text-center game-over"><p>GAME OVER!</p><p>PLEASE TRY AGAIN &#10084;</p></div>'; // game over message added to grid space

    if (score > hiscore) { // updates hi score
      hiscore = score * 1;
    }

    hiscoreDisplay.innerHTML = hiscore; // changes score display
    clearInterval(timerId); // clears timer interval for moveDown
  }
}
