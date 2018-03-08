import React, { Component, PureComponent } from 'react';
import GoogleMap from 'google-map-react';
import Marker from './marker';
import '../../styles/map.css';

export class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stations: this.props.checkedStations
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            stations: nextProps.checkedStations
        });
    }

    render() {
        const style = {
            width: '100%',
            height: '100%',
            
        }

        return (
            <div className="map">
                <GoogleMap
                        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_KEY }} // set if you need stats etc ...
                        center={[42.362968, -83.072342]}
                        zoom={12}
                        style={style}>
                        {this.state.stations
                            .map((station, index) => {
                                if (station.latitude !== "n/a" && station.longitude !== "n/a")
                                return (
                                        <Marker
                                            key={index}
                                            lat={station.latitude}
                                            lng={station.longitude}
                                            name={station.station_name}
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