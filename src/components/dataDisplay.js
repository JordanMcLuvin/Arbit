import React, { Component } from 'react';

class DataDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {dataPoints: []};
  }

  componentDidMount(){
    this.getData();
  }

  getData(){
    fetch('/api')
    .then((response) => response.json())
    .then(data => {
      this.setState({dataPoints: data.data});
    });
  }

  
  render() {
    const dataRows = [];
    for(let i = 0; i < this.state.dataPoints.length; i++){
      dataRows.push(<div key={i} className='dataRow'>{i}: {this.state.dataPoints[i].input} - - - - - - - - {this.state.dataPoints[i].calculated}</div>)
    }
    return (
      <div className='infoDisplay'>
        {dataRows}
      </div>
    );
  }
}

export default DataDisplay;
