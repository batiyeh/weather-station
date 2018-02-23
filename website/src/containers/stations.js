import React, { Component } from 'react';
import '../styles/App.css';
import Navigation from '../components/navigation.js';
import StationList from '../components/stations/stationList.js';
import VerifyLoggedIn from '../components/verifyLoggedIn.js'

class Stations extends Component {
  render() {
    return (
      <div className='StationList'>
        <VerifyLoggedIn/>
        <StationList/>
      </div>
    );
  }
}

export default Stations;
