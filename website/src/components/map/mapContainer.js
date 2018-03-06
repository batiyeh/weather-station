import React, { Component, PureComponent } from 'react';
import GoogleMap from 'google-map-react';
import Marker from './marker';
import '../../styles/map.css';

export class MapContainer extends PureComponent {
    constructor() {
        super();
        this.state = {
            stations: [],
        };
    }

    getInitialState() {
        return {
            stations: []
        };
    }

    componentDidMount(){
        this.getLatestWeather().then(stations => {
            this.setState({stations: stations})
        });
    }

    getLatestWeather = async () => {
        var stations = [];
        const response = await fetch('/api/weather/latest/');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message); 
        if (body.weather) stations = body.weather;

        return stations;
    };

    render() {
        const style = {
            width: '100%',
            height: '100%',
            
        }

        return (
            <div id={"google-maps"}  className="map-container">
                <GoogleMap
                        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_KEY}} // set if you need stats etc ...
                        center={[42.362968, -83.072342]}
                        zoom={9}
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