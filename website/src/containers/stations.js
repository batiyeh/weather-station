import React, { Component } from 'react';
import '../styles/App.css';
<<<<<<< HEAD
import Navigation from '../components/navigation.js';
import StationTable from '../components/stationTable.js';
=======
import StationList from '../components/stations/stationList.js';
>>>>>>> 7de18374eb162c6fa6fe5cb517aa7bc0249a26ee

class Stations extends Component {
  render() {
    return (
<<<<<<< HEAD
      <div className='StationTables'>
        <Navigation/>
        <StationTable/>
      </div>
=======
      <StationList></StationList>
>>>>>>> 7de18374eb162c6fa6fe5cb517aa7bc0249a26ee
    );
  }
}

export default Stations;
