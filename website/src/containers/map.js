import React, { Component } from 'react';
import '../styles/App.css';
import Navigation from '../components/navigation.js';
import VerifyLoggedIn from '../components/verifyLoggedIn.js'


class Map extends Component {
  render() {
    return (
      <div className='MapPage'>
        <VerifyLoggedIn/>
        <Navigation/>
        This is the map page
      </div>
    );
  }
}

export default Map;
