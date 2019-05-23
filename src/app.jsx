import React from 'react';
import Form from './form.jsx';
import Recommendation from './recommendation.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      returningUser: false,
      formSubmitted: false,
      userID: 0,
      dateOfLastOC: '',
      prevOdometerReading: 1000,
      suggestedInterval: 5000,
      currentOdometerReading: 2000,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e, state) {
    e.preventDefault();
    this.setState({
      dateOfLastOC: state.dateOfLastOC,
      prevOdometerReading: state.prevOdometerReading,
      suggestedInterval: state.suggestedInterval,
      formSubmitted: true
    })
  }

  getOdometer() {
    axios.get('/vehicle')
    .then(res => res.data)
    .then(data => data.json())
    .then(data => {
      this.setState({
        currentOdometerReading: data.distance
      })
    })
  }

  render() {
    
    if(this.state.returningUser || this.state.formSubmitted) {
      return (
        <Recommendation prevOdometerReading={this.state.prevOdometerReading} currentOdometerReading={this.state.currentOdometerReading} suggestedInterval={this.state.suggestedInterval}/>
      )
    }
    
    else {
      return (
        <Form handleSubmit={this.handleSubmit}/>
      )
    }
  }
}

export default App;