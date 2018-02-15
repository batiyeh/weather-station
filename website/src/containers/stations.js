import React, { Component } from 'react';
import '../styles/App.css';
import Navigation from '../components/navigation.js';
import StationTable from '../components/stationTable.js';

class Stations extends Component {
  render() {
    return (
      <div className='StationTables'>
        <Navigation/>
        <StationTable/>
      </div>
    );
  }
}

export default Stations;
