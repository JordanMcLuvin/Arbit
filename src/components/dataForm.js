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
    const validOptions = new Set(['USD', 'AUD', 'MXN', 'EUR', 'JPY']);
    let payload = [];
    for(const key in this.state){
      if(this.state[key].length === 0) continue;
      if(!validOptions.has(this.state[key].toUpperCase())) {
        console.log('invalid option in input box');
        payload = [];
        break;
      }
      payload.push(this.state[key].toUpperCase());
    }
    if(payload.length > 0){
      fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/JSON'
        },
        body: JSON.stringify({data: payload})
      })
      .then(response => response.json())
      .then(data => {
        // window.location.reload(false);
        console.log(data)
      })
    }
  }

  render() {
    const inputs = [];
    for(let i = 0; i < 8; i++){
      inputs.push(<input key={i} className='valueInput' placeholder='input value' onChange={(event) => this.handleChange(event, i)}></input>)
    }

    return (
      <div className='dataform-wrapper'>
        {inputs}
        <div className='buttonDiv'>
        <button onClick={this.handleClick.bind(this)}>Submit</button>
        </div>
      </div>
    );
  }
}

export default DataForm;
