import React, { Component } from 'react';
import DataDisplay from './dataDisplay';
import DataForm from './dataForm';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <DataForm />
        <DataDisplay />
      </div>
    );
  }
}

export default App;
