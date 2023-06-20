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
    for(let i = this.state.dataPoints.length - 1; i > 0; i--){
      const resObj = JSON.parse(this.state.dataPoints[i].calculated)
      dataRows.push(<div key={i} className='dataRow'>{i}: <br></br>
      <span className='dataRowField'><span className='dataRowCat'>Input:</span> {this.state.dataPoints[i].input} <br></br></span>
      <span className='dataRowField'><span className='dataRowCat'>Arbitrage:</span> {resObj.arbitrage}<br></br></span>
      <span className='dataRowField'><span className='dataRowCat'>Path:</span> {JSON.stringify(resObj.path)}<br></br></span>
      <span className='dataRowField'><span className='dataRowCat'>Rates:</span> {JSON.stringify(resObj.rates)}</span></div>)
    }
    return (
      <div className='infoDisplay'>
        <span className='display-text'>Previous Arbitrages</span>
        {dataRows}
      </div>
    );
  }
}

export default DataDisplay;
