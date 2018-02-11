import React, { Component } from 'react';
import '../styles/App.css';
import Navigation from '../components/navigation.js';
import StationTable from '../components/stationTable.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation></Navigation>
        <StationTable></StationTable>
      </div>
    );
  }
}

export default App;
