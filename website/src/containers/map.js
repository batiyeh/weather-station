import React, { Component } from 'react';
import VerifyLoggedIn from '../components/verifyLoggedIn.js'
import StationMap from '../components/stations/stationMap.js';
import StationSidebar from '../componenets/stations/stationSidebar.js';
import MapContainer from '../components/map/mapContainer.js';

class Map extends Component {
    render() {
        return (
            <div className='MapPage'>
                 <VerifyLoggedIn/>

                <StationMap></StationMap>
                <StationSidebar></StationSidebar>
                <MapContainer></MapContainer>

            </div>
        );
    }
}

export default Map;