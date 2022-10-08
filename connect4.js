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

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  for(let index = 0; index < HEIGHT; index++) {
    board.push([...Array(WIDTH)]);
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  // A: Missing el added
  const htmlBoard = document.querySelector('#board');

  // TODO: add comment for this code
  // A: Comments added blow
  // Create a table row element
  const top = document.createElement("tr");
  // Set attribute id to top (table row)
  top.setAttribute("id", "column-top");
  // add an listener to top (table row)
  top.addEventListener("click", handleClick);

  // Loop thru the size of board width
  for (let x = 0; x < WIDTH; x++) {
    // Create table data el. cell (Called HeadCell)
    const headCell = document.createElement("td");
    // Add attribute to headCell (table data cell) "id" = x (where is the index)
    headCell.setAttribute("id", x);
    // append each headCell (table data cell) to top (table row)
    top.append(headCell);
  }
  // Append top (table row) to htmlBoard
  htmlBoard.append(top);

  // TODO: add comment for this code
  // Loop trhu the size of board height
  for (var y = 0; y < HEIGHT; y++) {
    // Create table row el
    const row = document.createElement("tr");
    // Loop thru the size of board width
    for (var x = 0; x < WIDTH; x++) {
      // Create table data cell 
      const cell = document.createElement("td");
      // Add id attribute with y and x indexes as value
      cell.setAttribute("id", `${y}-${x}`);
      // Append cell to row el
      row.append(cell);
    }
    // Append row to html board
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  for (let y = HEIGHT - 1; y >= 0; y--) {
    if (!board[y][x]) {
      return y;
    }
  }
  return null;
}


/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const piece = document.createElement('div');
  piece.classList.add('piece', `p${currPlayer}`);
  document.getElementById(`${y}-${x}`).append(piece);
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
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
  board[y][x] = currPlayer;
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  currPlayer === 1 ? currPlayer = 2 : currPlayer = 1;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

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

  for (var y = 0; y < HEIGHT; y++) {
    for (var x = 0; x < WIDTH; x++) {
      var horiz = [
        [y, x], [y, x + 1], [y, x + 2], [y, x + 3]
      ];
      var vert = [
        [y, x], [y + 1, x], [y + 2, x], [y + 3, x]
      ];
      var diagDR = [
        [y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]
      ];
      var diagDL = [
        [y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]
      ];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
