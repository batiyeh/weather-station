import React, { Component } from 'react';
import VerifyLoggedIn from '../components/verifyLoggedIn.js';
import MapContainer from '../components/map/mapContainer.js';
import StationSidebar from '../components/map/stationSidebar.js';
// import checkbox from '../components/stations/checkbox.js';
class Map extends Component {
    render() {
        return (
            <div className='MapPage'>

                 <VerifyLoggedIn/>
                <VerifyLoggedIn/>
                <div class="row">
                    <div class="col-12">
                        <div class="col-4">
                            <StationSidebar></StationSidebar>
                        </div>
                        <div class="col-8">
                            <MapContainer></MapContainer>
                        </div>
                    </div>
                    
                </div>

                {/* <checkbox></checkbox> */}

            </div>
        );
    }
}

export default Map;