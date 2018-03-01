import React, { Component } from 'react';
import VerifyLoggedIn from '../components/verifyLoggedIn.js'
import StationMap from '../components/stations/stationMap.js';

class Map extends Component {
    render() {
        return (
            <div className='MapPage'>
                 <VerifyLoggedIn/>
                <StationMap></StationMap>
            </div>
        );
    }
}

export default Map;