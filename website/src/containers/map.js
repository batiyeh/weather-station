import React, { Component } from 'react';
import VerifyLoggedIn from '../components/verifyLoggedIn.js';
import StationSidebar from '../components/stations/stationSidebar.js';
import MapContainer from '../components/map/mapContainer.js';
import checkbox from '../components/stations/checkbox.js';
class Map extends Component {
    render() {
        return (
            <div className='MapPage'>

                 <VerifyLoggedIn/>
                <VerifyLoggedIn/>
                <MapContainer></MapContainer>
                <StationSidebar></StationSidebar>
                <checkbox></checkbox>

            </div>
        );
    }
}

export default Map;