import gridReducer from './features/gridSlice';

export default function rootReducer(state = {}, action) {
  return {
    mineField: gridReducer(state.mineField, action),
  }
}