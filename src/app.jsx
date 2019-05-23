import React from "react";
import axios from "axios";
import Form from "./form.jsx";
import Recommendation from "./recommendation.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      returningUser: false,
      formSubmitted: false,
      userID: 0,
      dateOfLastOC: "",
      prevOdometerReading: 0,
      suggestedInterval: 5000,
      currentOdometerReading: 0
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getOdometer = this.getOdometer.bind(this);
  }

  componentDidMount() {
    this.getOdometer();
  }

  handleSubmit(e, state) {
    e.preventDefault();
    this.setState({
      dateOfLastOC: state.dateOfLastOC,
      prevOdometerReading: state.prevOdometerReading,
      suggestedInterval: state.suggestedInterval,
      formSubmitted: true
    });
  }

  getOdometer() {
    axios
      .get("/vehicle")
      .then(res => res.data.data)
      .then(data => {
        console.log(data.distance);
        this.setState({
          currentOdometerReading: data.distance
        });
      });
  }

  render() {
    if (this.state.returningUser || this.state.formSubmitted) {
      return (
        <Recommendation
          prevOdometerReading={this.state.prevOdometerReading}
          currentOdometerReading={this.state.currentOdometerReading}
          suggestedInterval={this.state.suggestedInterval}
        />
      );
    } else {
      return <Form handleSubmit={this.handleSubmit} />;
    }
  }
}

export default App;
