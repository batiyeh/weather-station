import React, { Component, PureComponent } from 'react';
import GoogleMap from 'google-map-react';
import Marker from './marker';
import '../../styles/map.css';

export class MapContainer extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            stations: this.props.stations,
        };
    }

    render() {
        const style = {
            width: '100%',
            height: '100%',
            
        }

        return (
            <div className="map">
                <GoogleMap
                        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_KEY}} // set if you need stats etc ...
                        center={[42.362968, -83.072342]}
                        zoom={12}
                        style={style}>
                        {this.state.stations
                            .map(station => {
                                if (station.latitude !== "n/a" && station.longitude !== "n/a")
                                return (
                                        <Marker
                                            key={station.station_name}
                                            lat={station.latitude}
                                            lng={station.longitude}
                                            text={'A'}
                                        />
                                );
                            })
                        }
                </GoogleMap>
            </div>
        ); 
    }

}
export default MapContainer