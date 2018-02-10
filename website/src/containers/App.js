import React, { Component } from 'react';
import '../styles/App.css';
import Navigation from '../components/navigation.js'

class App extends Component {
  state = {
    response: ''
  };

  componentDidMount() {
    this.callApi()
      .then(res => {
        this.setState({ response: res.stations });
      })
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/stations');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    return (
      <div className="App">
        <Navigation></Navigation>
        <p className="App-intro">{this.state.response}</p>
      </div>
    );
  }
}

export default App;
