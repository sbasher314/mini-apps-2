import React from 'react'
import TimeScaleChart from './components/Chart'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  render () {
    return (
      <>
        <TimeScaleChart data={this.state.data} />
      </>
    )
  }
}

export default App;