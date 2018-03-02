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

    componentDidMount() {
        this.getStations().then(stations => {
            this.setState({stations: stations})
        });
    }

    getStations = async () => {
        var stations = [];
        const response = await fetch('/api/stations');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        if (body.stations) stations = body.stations;

        return stations;
    }


    render() {

        return (
            <div className={"google-maps"}>
                <Map google={this.props.google} zoom={3}>
                    <InfoWindow onClose = {this.oninfoWindowClose}> </InfoWindow>
                    {this.state.stations
                        .map(station => {
                            return (
                                <Marker
                                    position={{lat: station.latitude, lng:station.longitude}}
                                    // call another card which grabs the rows of the longitude and latitude
                                />
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