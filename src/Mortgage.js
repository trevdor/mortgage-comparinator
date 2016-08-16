import React, { Component } from 'react';
import { LineChart, XAxis, YAxis, CartesianGrid, Line } from 'recharts';
import './App.css';

class App extends Component {
  render() {
    const data = this._calculateAmortizationSchedule();
    return (
      <LineChart width={ 640 } height={ 320 } data={ data }
        margin={{top: 20, right: 80, bottom: 20, left: 20}}>
        <XAxis
          dataKey='month'
          label='Months'
          domain={[0, 'dataMax']}
          tick={ this._getXTicks(this.props) }
        />
        <YAxis label="Balance" />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
        <Line type="monotone" dataKey="balanceRemaining" stroke="green" />
      </LineChart>
    );
  }

  _calculateAmortizationSchedule() {
    const i = 0.003125;
    const P = 280000;
    const n = 360;

    let schedule = [];
    for(let p=1; p<=n; p++) {
      schedule.push({
        month: p,
        balanceRemaining: P * ( Math.pow(1 + i, n) - Math.pow(1 + i, p) ) / ( Math.pow(1 + i, n) - 1 )
      });
    }

    return schedule;
  }

  _getXTicks({x, y, stroke, data}) {
   	return (
    	<g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">{data.month}</text>
      </g>
    );
  }
}

export default App;
