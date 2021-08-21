import './App.css';
import Grid from './Components/Grid'

function App() {
  return (
    <div className="App">
      <Grid></Grid>
      <div className="controls">
        <h3>Instructions:</h3>
        <span>Left click will expose the cell</span><br />
        <span>Middle/Right click will flag the cell as a mine</span>
      </div>
    </div>
  );
}

export default App;
