import React, { Component } from 'react';
import { XAxis, YAxis, CartesianGrid, Line, LineChart, Tooltip } from 'recharts';
import { equity } from './equity';
import CustomTooltip from './CustomTooltip';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class CashOutRefi extends Component {

  constructor(props) {
    super(props);

    this.state = {
      principal: 280000,
      interestRate: 3.75,
      term: 360
    }
  }

  changePrincipal(event) {
    this.setState({ principal: event.target.value });
  }
  changeInterestRate(event) {
    this.setState({ interestRate: event.target.value });
  }
  changeTerm(event, key, payload) {
    this.setState({ term: payload });
  }

  _calcBalanceRemaining({ P, i, n, p }) {
    const balance = P * ( Math.pow(1 + i, n) - Math.pow(1 + i, p) ) / ( Math.pow(1 + i, n) - 1 );
    return Math.round(balance, 2);
  }

  _calculateAmortizationSchedule({ principal, interestRate, term }) {
    const i = interestRate / 100 / 12;
    const P = principal;
    const n = term;

    let schedule = [];
    for(let p=1; p<=n; p++) {
      schedule.push({
        month: p,
        balanceRemaining: this._calcBalanceRemaining({ P, i, n, p })
      });
    }

    return schedule;
  }

  render() {
    const { principal, interestRate, term } = this.state;
    const equity = this._calculateAmortizationSchedule({ principal, interestRate, term });

    return (
      <div>
        <div style={{ display:'flex', justifyContent:'center' }}>
          <TextField
            hintText="$"
            floatingLabelText="Principal Amount"
            value={ this.state.principal }
            onChange={ this.changePrincipal.bind(this) }
          />
          <TextField
            hintText="3.75%"
            floatingLabelText="Interest Rate"
            value={ this.state.interestRate }
            onChange={ this.changeInterestRate.bind(this) }
          />
          <SelectField
            value={ this.state.term }
            onChange={ this.changeTerm.bind(this) }
            floatingLabelText="Repayment Term (months)">
            <MenuItem value={ 180 } primaryText="15" />
            <MenuItem value={ 240 } primaryText="20" />
            <MenuItem value={ 360 } primaryText="30" />
          </SelectField>
        </div>

        <div style={{ display:'flex', justifyContent:'center' }}>
          <LineChart width={ 720 } height={ 320 } data={ equity }
            margin={ {top: 20, right: 80, bottom: 20, left: 20} }>
            <XAxis dataKey="month" label='Months' />
            <YAxis label='Balance' />
            <CartesianGrid stroke="#eee" />
            <Tooltip content={ <CustomTooltip /> } />
            <Line dot={ false } dataKey="balanceRemaining" stroke="#307dd7" />
          </LineChart>
        </div>
      </div>
    );
  }

}

export default CashOutRefi;
