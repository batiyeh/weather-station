import React, { Component } from 'react';
import VerifyLoggedIn from '../components/verifyLoggedIn';
import MapContainer from '../components/map/mapContainer';
import SidebarItem from '../components/map/sidebarItem';
import { FormGroup, Input, Alert, Label } from 'reactstrap';

class Map extends Component {
    constructor() {
        super();
        this.state = {
            stations: [],
            checkedStations: [],
            loading: true,
            filter: '',
        };
        this.checkboxOnChange = this.checkboxOnChange.bind(this);
    }

    // Set all stations that have sent weather in our state as checked
    componentDidMount(){
        this.getLatestWeather().then(stations => {
            var checkedStations = this.addCheckedStations(stations);
            this.setState({
                stations: stations,
                checkedStations: checkedStations,
                loading: false
            })
        });
    }

    // Request the stations' latest we ather
    getLatestWeather = async () => {
        var stations = [];
        const response = await fetch('/api/weather/latest/');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message); 
        if (body.weather) stations = body.weather;

        return stations;
    };

    // Push stations into our checkedStations array
    addCheckedStations(stations){
        var checkedStations = [];
        if (stations.length !== 0){
            stations.map(station => {
                if (station.latitude !== "n/a" && station.longitude !== "n/a"){
                    checkedStations.push(station);
                }
            })
        }

        return checkedStations;
    }

    // Set the component's filter state whenever the filter input changes 
    filterOnChange(e){
        this.setState({
            filter: e.target.value
        })
    }

    updateCheckedStations(stations){
        this.setState({
            checkedStations: stations
        });
    }

    // Handle a checkbox click event by removing/adding it to the checkedStations
    checkboxOnChange(event, station){
        var checkedStations = this.state.checkedStations;
        if (event.target.checked === true){
            checkedStations.push(station);
            this.updateCheckedStations(checkedStations);
        }

        else{
            var index = checkedStations.indexOf(station);
            if (checkedStations.length === 1) checkedStations.pop();
            else checkedStations.splice(index, 1);
            this.updateCheckedStations(checkedStations);
        }
    }

    // Returns false if the filter string is not in the station's name.
    // Returns true if the filter is empty or is within the station's name.
    filterStations(station){
        if (this.state.filter !== '')
            return station.station_name.toLowerCase().includes(this.state.filter.toLowerCase());
        return true;
    }

    renderSidebar(){
        if (this.state.stations.length === 0){
            return <Alert className="no-stations-alert" color="primary">
                        There are no stations with GPS data.
                    </Alert>
        }

        else{
            return (
                <div className="name-list">
                {
                    this.state.stations
                    .filter(this.filterStations.bind(this))
                    .map((station, index) => {
                        if (station.latitude !== "n/a" && station.longitude !== "n/a"){
                            return (
                                <SidebarItem key={station.apikey} index={index} station={station} checkboxOnChange={this.checkboxOnChange}></SidebarItem>
                            );
                        }
                    })
                }
                </div>
            );
        }
    }

    render() {
        if (this.state.loading === false){
            return(
                <div className='MapPage'>
                    <VerifyLoggedIn/>
                    <div className="sidebar-container" style={{position: 'absolute', left: 0, top: 0, width: '25%', height: '100%'}}>
                        <div className='sidebar'>
                            <FormGroup className="col-12">
                                <Input type="text" className="filterWidth" name="stationFilter" id="stationFilter" placeholder="Filter" onChange={this.filterOnChange.bind(this)} />
                            </FormGroup>
                            { this.renderSidebar() }
                        </div>
                    </div>
                    <div className="map-container" style={{position: 'absolute', right: 0, top: 0, width: '75%', height: '100%'}}>
                        <MapContainer checkedStations={this.state.checkedStations}></MapContainer>
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