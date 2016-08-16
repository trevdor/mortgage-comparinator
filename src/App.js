import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './App.css';
import CashOutRefi from './CashOutRefi';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin(); // Needed for onTouchTap http://stackoverflow.com/a/34015469/988941

class App extends Component {

  render() {
    return (
      <MuiThemeProvider>
        <CashOutRefi/>
      </MuiThemeProvider>
    );
  }

}

export default App;
