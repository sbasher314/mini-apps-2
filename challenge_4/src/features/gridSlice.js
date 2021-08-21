const defaultSize = {rows: 10, cols: 10}
const defaultMines = 10;

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
    state.grid[r][c] = "X";
    console.log(r, c);
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
    turns: 0
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

let generatedState = init();

export default function gridReducer(state = generatedState, action) {
  switch (action.type) {
    case 'click': {
      //check if mine, else make visible... might make a helper / sub-function
      const newState = {...state};
      return newState;
    }
    case 'flag': {
      //set visibility at place as f
      const newState = {...state};
      return newState;
    }
    case 'reset': {
      return init(state);
    }
    default: {
      return state;
    }
  }
}