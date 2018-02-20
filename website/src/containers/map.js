import React, { Component } from 'react';
import '../styles/App.css';
import Navigation from '../components/navigation.js';
import VerifyLoggedIn from '../components/verifyLoggedIn.js'
import StationMap from '../components/stations/stationMap.js';

class Map extends Component {
    render() {
            return (
                  <div className='MapPage'>
                        <VerifyLoggedIn/>
                        <Navigation/>
                        <StationMap></StationMap>

                     </div>
        );
    }
}

export default Map;