import React, { Component } from 'react';
import DataDisplay from './dataDisplay';
import DataForm from './dataForm';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='app-wrapper' >
        <div className='introduction'>
          <div className='intro-header'>Hello and welcome User!</div>
          <div className='description'>This app will take money denominations and give you the best arbitrage. Starts at USD and ends at USD</div>
          <div className='instructions'>Simply list out the denominations you want to arbitrage through in the boxes below.</div>
          <div className='instructions'>Do not include doubled inputs. Numbers inputs will also prevent this from working</div>
          <div className='denoms-description'>Valid Denominations inputs: <span className='denoms'>JPY, EUR, MXN, AUD</span></div>
        </div>
        <DataForm />
        <DataDisplay />
      </div>
    );
  }
}

export default App;
