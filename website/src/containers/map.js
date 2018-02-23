import React, { Component } from 'react';
import Navigation from '../components/navigation.js';
import VerifyLoggedIn from '../components/verifyLoggedIn.js'
import StationMap from '../components/map/stationMap.js';

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