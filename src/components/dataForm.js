import React, { Component } from 'react';

class DataForm extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, key) {
    this.setState({[key]: event.target.value})
  };

  handleClick(){
    let payload = []; 
    for(const key in this.state){
      payload.push(this.state[key]);
    }
    fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON'
      },
      body: JSON.stringify({data: payload})
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
    })
  }

  render() {
    const inputs = [];
    for(let i = 0; i < 8; i++){
      inputs.push(<input key={i} className='valueInput' placeholder='input value' onChange={(event) => this.handleChange(event, i)}></input>)
    }

    return (
      <div>
        {inputs}
        <div className='buttonDiv'>
        <button onClick={this.handleClick.bind(this)}>Submit</button>
        </div>
      </div>
    );
  }
}

export default DataForm;
