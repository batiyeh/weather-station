import React, { Component } from 'react';
import VerifyLoggedIn from '../components/verifyLoggedIn';
import MapContainer from '../components/map/mapContainer';
import Sidebar from '../components/map/sidebar';

class Map extends Component {
    constructor() {
        super();
        this.state = {
            stations: [],
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
        if (this.state.stations.length != 0){
            return(
                <div className='MapPage'>
                    <VerifyLoggedIn/>
                    <div className="sidebar-container" style={{position: 'absolute', left: 0, top: 0, width: '30%', height: '100%'}}>
                        <Sidebar stations={this.state.stations}></Sidebar>
                    </div>
                    <div className="map-container" style={{position: 'absolute', right: 0, top: 0, width: '70%', height: '100%'}}>
                        <MapContainer stations={this.state.stations}></MapContainer>
                    </div>
                </div>
            )
        }

        else{
            return(
                <div className='MapPage'>
                
                </div>
            );
        }
    }
}

export default Map;