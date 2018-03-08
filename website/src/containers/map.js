import React, { Component } from 'react';
import VerifyLoggedIn from '../components/verifyLoggedIn';
import MapContainer from '../components/map/mapContainer';
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
    }

    componentWillMount(){
        this.getLatestWeather().then(stations => {
            var checkedStations = this.getCheckedStations(stations);
            this.setState({
                stations: stations,
                checkedStations: checkedStations,
                loading: false
            })
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

    getCheckedStations(stations){
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

    checkboxOnChange(event, station){
        var checkedStations = this.state.checkedStations;
        if (event.target.checked === true){
            checkedStations.push(station);
            this.setState({
                checkedStations: checkedStations
            });
        }

        else{
            var index = checkedStations.indexOf(station);
            if (checkedStations.length === 1) checkedStations.pop();
            else checkedStations = checkedStations.splice(index, 1);
            this.setState(prevState => {
                return {
                    checkedStations: checkedStations
                }
            });
        }
    }

    // Returns false if the filter string is not in the station's name.
    // Returns true if the filter is empty or is within the station's name.
    filterStations(station){
        if (this.state.filter !== '')
            return station.station_name.toLowerCase().includes(this.state.filter.toLowerCase());
        return true;
    }

    renderStationNames(){
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
                            if (index % 2 !== 0){
                                return (
                                    <div key={station.apikey} className="list-item-container">
                                        <FormGroup check>
                                            <Label check>
                                                <Input type="checkbox" defaultChecked={true} onChange={(event) => this.checkboxOnChange(event, station)}/>{' '}
                                                <span className="station-name">{station.station_name}</span>
                                            </Label>
                                        </FormGroup>
                                    </div>
                                );
                            }
                            else{
                                return (
                                    <div key={station.apikey} className="list-item-container-dark">
                                        <FormGroup check>
                                            <Label check>
                                                <Input type="checkbox" defaultChecked={true} onChange={(event) => this.checkboxOnChange(event, station)}/>{' '}
                                                <span className="station-name">{station.station_name}</span>
                                            </Label>
                                        </FormGroup>
                                    </div>
                                );
                            }
                            
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
                            { this.renderStationNames() }
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