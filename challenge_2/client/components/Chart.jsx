import React from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-luxon';

class TimeScaleChart extends React.Component {
  constructor(props) {
    super(props);
    this.chart = React.createRef();
  }

  componentDidMount() {
    var ctx = this.chart.current;
    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [ //this.props.labels
          new Date('7/01/2021'),
          new Date('7/05/2021'),
          new Date('7/10/2021'),
          new Date('7/15/2021'),
          new Date('7/20/2021'),
          new Date('7/25/2021'),
          new Date('7/30/2021'),
          new Date('8/04/2021'),
        ],
        datasets: [
          {
            label: 'Bitcoin Price',
            backgroundColor: '#f669',
            borderColor: '#f66',
            fill: false,
            data: [0,1,2,3,4,5,6,7] //this.props.data
          }
        ]
      },
      options: {
        responsive: true,
        aspectRatio: 2,
        plugins: {
          title: {
            text: 'Bitcoin Price Tracker',
            display: true
          }
        },
        scales: {
          x: {
            type: 'time',
            time: {
              // Luxon format string
              tooltipFormat: 'DD T'
            },
            title: {
              display: true,
              text: 'Date'
            }
          },
          y: {
            title: {
              display: true,
              text: 'value'
            }
          }
        },
      },
    });
  }

  render() {
    return (
      <div className="chart">
        <canvas ref={this.chart} width="400" height="400"></canvas>
      </div>
    )
  }
}

export default TimeScaleChart;