const defaultSize = {rows: 10, cols: 10}
const defaultMines = 10;
const mine = 'm';
const flag = 'f';
const tripped = 'x';

function generateMines(state, n = defaultMines, gridSize = defaultSize) {
  let mineArray = [];
  for (var i = 0; i < n; i++) {
    let r = Math.random() * gridSize.rows >> 0;
    let c = Math.random() * gridSize.cols >> 0;
    //We check if a bomb already exists in this spot...
    if (mineArray.includes(r+'-'+c)) {
      i--;
      continue;
    }
    //If not, we add a compound id to identify it
    mineArray.push(r+'-'+c);
    state.grid[r][c] = mine;
    for (var row = r - 1; row <= r + 1; row++) {
      if (row >= gridSize.rows) {
        break;
      }
      if (row < 0) {
        continue
      }
      for (var col = c - 1 || 0; col <= c + 1; col++) {
        if (col >= gridSize.cols) {
          break;
        }
        if (col < 0) {
          continue
        }
        if (isNaN(state.grid[row][col])) {
          continue;
        } else {
          state.grid[row][col]++;
        }
      }
    }
    //and add it to the grid -- X === Mine
    //and then mark spots around the Mine += 1
  }
  return state;
}

function init(state = {}, gridSize = defaultSize, numMines = defaultMines) {
  let initialState = {
    grid : [],
    visible: [],
    numMines,
    flagged: 0,
    correctlyFlagged: 0,
    turns: 0,
    hasFailed: false
  }
  for (let r = 0; r < gridSize.rows; r++) {
    initialState.grid[r] = Array(gridSize.cols).fill(0);
    initialState.visible[r] = Array(gridSize.cols).fill('')
  }

  state = generateMines(
    Object.assign(state, initialState), numMines, gridSize
  );
  return state;
}

function findAdjacentZeroes(visible, grid, row, column) {
  const visited = [];

  function checkAdjacent(row, column) {
    if (visited.includes(row+'-'+column)) {
      return;
    }
    if (row < 0 || column < 0 || row >= grid.length || column >= grid[0].length) {
      return;
    }
    visited.push(row+'-'+column);
    let isZero = grid[row][column] === 0
    visible[row][column] = grid[row][column];

    if (isZero) {
      checkAdjacent(row - 1, column - 1);
      checkAdjacent(row - 1, column);
      checkAdjacent(row - 1, column + 1);
      checkAdjacent(row, column - 1);
      checkAdjacent(row, column + 1);
      checkAdjacent(row + 1, column - 1);
      checkAdjacent(row + 1, column);
      checkAdjacent(row + 1, column + 1);
    }
  }

  checkAdjacent(row, column);
  return visible;
}

let generatedState = init();

export default function gridReducer(state = generatedState, action) {
  switch (action.type) {
    case 'click': {
      const {row, column} = action.payload;
      let visible = [...state.visible];
      let hasFailed = state.hasFailed;
      if (visible[row][column] !== flag) {
        if (state.grid[row][column] === mine) {
          visible = state.grid;
          visible[row][column] = tripped;
          hasFailed = true;
        } else {
          const value = state.grid[row][column]
          visible[row][column] = value;
          if (value === 0) {
            findAdjacentZeroes(visible, state.grid, row, column);
          }
        }
      } else {
        console.error('Can not check cell when it is flagged')
      }
      //check if mine, else make visible... might make a helper / sub-function
      return {...state, visible, hasFailed}
    }
    case 'flag': {
      const {row, column} = action.payload;
      const visible = [...state.visible];
      let correctlyFlagged = state.correctlyFlagged;
      let flagged = state.flagged;
      if (visible[row][column] === '') {
        visible[row][column] = flag;
        if (state.grid[row][column] === mine) {
          correctlyFlagged++;
        }
        flagged++;
      } else if (visible[row][column] === flag) {
        visible[row][column] = '';
        if (state.grid[row][column] === mine) {
          correctlyFlagged--;
        }
        flagged--;
      } else {
        console.error('This cell can not be flagged!')
      }
      if (correctlyFlagged === state.numMines && flagged === state.numMines) {
        console.log('You correctly found all the bombs!');
        alert('You correctly found all the bombs!')
      }
      //set visibility at place as f
      return {...state, visible, flagged, correctlyFlagged};
    }
    case 'reset': {
      return init(state);
    }
    default: {
      return state;
    }
  }
}