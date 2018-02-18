import React, { Component } from 'react';
import '../styles/App.css';
import Navigation from '../components/navigation.js';


class Map extends Component {
  render() {
    return (
      <div className='MapPage'>
        <Navigation/>
        This is the map page
      </div>
    );
  }
}

export default Map;
