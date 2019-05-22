import React from 'react';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateOfLastOC: '',
      unknownDate: false,
      prevOdometerReading: 0,
      unknownPrevOdometerReading: false,
      suggestedInterval: 5000,
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
  }

  handleChange(e) {
    let property = e.target.name;
    let value = e.target.value;
    this.setState({
      [property] : value
    })
  }

  handleCheckbox(e) {
    let property = e.target.name;
    let value = e.target.checked;
    this.setState({
      [property] : value
    })
  }

  render() {
    return (
      <form onSubmit={e => this.props.handleSubmit(e, this.state)}>
        when was the last time you got an oil change? <input type="date" name="dateOfLastOC" value={this.state.dateOfLastOC} onChange={this.handleChange}></input> <br />
        <input type="checkbox" name="unknownDate" checked={this.state.unknownDate} onChange={this.handleCheckbox}/>I don't know <br />
        what was the mileage on your odometer the last time you got an oil change? <input type="text" name="prevOdometerReading" value={this.state.prevOdometerReading} placeholder="0" onChange={this.handleChange}></input> <br />
        <input type="checkbox" name="unknownPrevOdometerReading" value={this.state.unknownDate} onChange={this.handleCheckbox}/>I don't know <br />
        what is your vehicle's recommended mileage interval before oil change?  <input type="text" name="suggestedInterval" value={this.state.suggestedInterval} placeholder="5000" onChange={this.handleChange}></input> <br />
        (this value will default to 5000 miles) <br />
        <button type="submit">submit</button>
      </form>
    )
  }
}

export default Form;