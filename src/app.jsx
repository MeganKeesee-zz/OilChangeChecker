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
  }

  render() {
    return (
    <div>
      <Form />
    </div>
    )
  }
}

export default App;