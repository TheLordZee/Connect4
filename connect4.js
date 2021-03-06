/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])

// Sets base score
let playerOne = 0;
let playerTwo = 0;
let p1score = document.getElementById('p1tries');
let p2score = document.getElementById('p2tries');

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  for(let i = 0; i < HEIGHT; i++){
    const row = [];
    for(let j = 0; j < WIDTH; j++){
      row[j] = 'empty';
    }
    board.push(row);
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.querySelector('#board');

  // TODO: add comment for this code
  //Creates the top row and handles hover and clicks
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // TODO: add comment for this code
  //Creates the body of the board
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
    for(let i = HEIGHT - 1; i >= 0; i--){
    if(board[i][x] === 'empty'){  
        board[i][x] = currPlayer;
        return i;
    }
  }
  return;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  console.log(x,y);
  const placed = document.getElementById(`${y}-${x}`);
  const piece = document.createElement('div');
  piece.classList.add('piece');
  if(currPlayer === 1){
    piece.classList.add('blue')
  } else {
    piece.classList.add('red');
  }
  placed.append(piece);
  console.log(board);
}

// Adds functionality to the restart button
let restart = document.querySelector('#restart-btn');
restart.addEventListener('click', function(){
  location.reload();
});

/** endGame: announce game end */
// Announces game end and allows for you to restart
function endGame(msg) {
  // TODO: pop up alert message
  document.getElementById('head').innerText = msg;
  document.querySelector('#end-game').style.display = 'flex';
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  const x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  } 

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame

  if(checkForTie()){
    return endGame("TIE. GAME OVER.")
  }

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  // Also increases score
  if(currPlayer === 1){
    playerOne++;
    p1score.innerText = playerOne;
    currPlayer = 2;
  } else {
    playerTwo++;
    p2score.innerText = playerTwo;
    currPlayer = 1;
  }
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

// Checks for tie
const checkForTie = () => {
  for(let i = 0; i < HEIGHT; i++){
    if(board[i].indexOf('empty') !== -1){
      return false;
    }
  }
  return true;
}

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
