import React, { Component } from 'react';
import VerifyLoggedIn from '../components/verifyLoggedIn.js';
import StationSidebar from '../components/stations/stationSidebar.js';
import MapContainer from '../components/map/mapContainer.js';

class Map extends Component {
    render() {
        return (
            <div className='MapPage'>
                 <VerifyLoggedIn/>

                <MapContainer></MapContainer>
                <StationSidebar></StationSidebar>

            </div>
        );
    }
}

export default Map;