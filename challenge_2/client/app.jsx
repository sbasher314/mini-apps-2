import React from 'react'
import TimeScaleChart from './components/Chart'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      updatedAt: null
    };
  }

  componentDidMount() {
    const coindesk = 'https://api.coindesk.com/v1/bpi/historical/close.json';
    fetch(coindesk)
      .then(response => response.json())
      .then(dataset => {
        const data = dataset['bpi'];
        const updatedAt = dataset['time'].updated;
        this.setState({data, updatedAt});
      })
      .catch(err => {
        console.error(err);
      });
  }

  render () {
    return (
      <>
        <TimeScaleChart data={this.state.data} />
        {this.state.updatedAt &&
          <span className="updatedAt">Updated at: {(new Date(this.state.updatedAt)).toLocaleString()}</span>
        }
      </>
    )
  }
}

export default App;