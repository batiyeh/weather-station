import React, { Component } from 'react';
import StationCard from './stationCard';
import { FormGroup, Input, Alert } from 'reactstrap';

// Station List component is a list of each station
// Each connected station is built out of a single Station component in a loop here
class StationList extends Component {
    // Constructor called when the component is loaded in
    constructor() {
        super();
        this.state = {
            stations: [],
            secondsElapsed: 0,
            filter: ''
        };
    }

    // Sets the initial state of the component to be null/0 so 
    // we can update it later
    getInitialState() {
        return {
            stations: [],
            secondsElapsed: 0,
            filter: ''
        };
    }

    // Called when the component is first "mounted" (loaded) into the page
    // This fetches the stations from our API and adds them to our current state
    componentDidMount() {
        this.getStations().then(stations => { 
            this.setState({ stations: stations });
        });
        this.interval = setInterval(this.updateStations, 3000);
    }

    // Called when the component is destroyed and removed from the page
    // I am removing the interval so it is not still called after the component disappears.
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    // This will access our API to get updated data and then updates the state
    // of the page
    updateStations = async () => {
        this.getStations().then(stations => {
            this.setState({ 
                stations: stations, 
                secondsElapsed: this.state.secondsElapsed + 3
            });
        });
    }
    
    // Async call to fetch everything from our stations endpoint while the page is still loading
    // Returns an array of stations
    getStations = async () => {
        var stations = [];
        const response = await fetch('/api/stations');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message); 
        if (body.stations) stations = body.stations;
        console.log(body);
        return stations;
    };

    // Set the component's filter state whenever the filter input changes 
    filterOnChange(e){
        this.setState({
            filter: e.target.value
        })
    }

    // Returns false if the filter string is not in the station's name.
    // Returns true if the filter is empty or is within the station's name.
    filterStations(station){
        if (this.state.filter !== '')
            return station.mac_address.toLowerCase().includes(this.state.filter.toLowerCase());
        return true;
    }

    // If there are no stations stored in the state, render
    // the no stations alert.
    renderAlert(){
        if (this.state.stations.length === 0){
            return (
                <Alert className="no-stations-alert" color="primary">
                    There are no stations to display.
                </Alert>
            );
        }
    }

    render() {
        return (
            <div className="container content">
                <FormGroup>
                    <Input type="text" className="filterWidth" name="stationFilter" id="stationFilter" placeholder="Filter" onChange={this.filterOnChange.bind(this)} />
                </FormGroup>
                { this.state.stations
                    .filter(this.filterStations.bind(this))
                    .map(station => {
                        return (
                            <StationCard key={station.station_id} station={station}></StationCard>
                        );
                    }) 
                }   
                { this.renderAlert() }
            </div>
        );
  }
}

export default StationList;