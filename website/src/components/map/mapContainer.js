import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import '../../styles/map.css';


export class MapContainer extends Component {

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

    componentDidMount()
    {
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
                <Map google={this.props.google} style={style} zoom={3}>
                    {this.state.stations
                        .map(station => {
                            return (
                                // <InfoWindow  key={station.station_name} onClose={this.oninfoWindowClose}>
                                    <Marker
                                        key={station.station_name}
                                        position={{lat: station.latitude, lng:station.longitude}}
                                    />
                                // </InfoWindow>
                            );
                        })
                    }
                </Map>
            </div>
        );
    }

}
export default GoogleApiWrapper({
    apiKey: ('AIzaSyAzZjgldMQ9B4fp0NzKVrzECYzs8uwY78Q')
}) (MapContainer)