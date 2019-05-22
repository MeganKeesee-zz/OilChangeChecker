import React from 'react';
import Form from './form.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      returningUser: false,
      userID: 0,
      dateOfLastOC: '',
      prevOdometerReading: 0,
      suggestedInterval: 5000,
      currentOdometerReading: 0,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e, state) {
    e.preventDefault();
    this.setState({
      dateOfLastOC: state.dateOfLastOC,
      prevOdometerReading: state.prevOdometerReading,
      suggestedInterval: state.suggestedInterval
    })
  }

  render() {
    return (
    <div>
      <Form handleSubmit={this.handleSubmit}/>
    </div>
    )
  }
}

export default App;