import React, { Component } from 'react';
import Station from '../components/station';

// Station List component is a list of each station
// Each connected station is built out of a single Station component in a loop here
class StationList extends Component {
    // Constructor called when the component is loaded in
    constructor() {
        super();
        this.state = {
            stations: [],
            secondsElapsed: 0
        };
    }

    // Sets the initial state of the component to be null/0 so 
    // we can update it later
    getInitialState() {
        return {
            stations: [],
            secondsElapsed: 0
        };
    }

    // Called when the component is first "mounted" (loaded) into the page
    // This fetches the stations from our API and adds them to our current state
    componentDidMount() {
        this.getStations().then(res => { 
            this.setState({ stations: res.stations });
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
    updateStations = () => {
        this.getStations().then(res => {
            this.setState({ 
                stations: res.stations, 
                secondsElapsed: this.state.secondsElapsed + 3
            });
        });
    }
    
    // Async call to fetch everything from our stations endpoint while the page is still loading
    // Returns an array of stations
    getStations = async () => {
        const response = await fetch('/api/stations');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);

        return body;
    };
    
    // Render just takes the HTML and renders it to the page
    render() {
        return (
            <div className="container content">
                {/* {
                    this.state.stations.map(station => {
                        return (
                            <Station station={station}></Station>
                        );
                    })
                } */}
                <table className="table table-bordered table-striped">
                    <thead>
                    <tr>
                        <th>Station Name</th>
                        <th>Last Updated</th>
                        <th>MAC Address</th>
                        <th>Temperature</th>
                        <th>Humidity</th>
                        <th>Pressure</th>
                    </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.stations.map(station => {
                            return (
                            <tr key={station.station_id}>
                                <td>{station.station_name}</td>
                                <td>{station.updated_at}</td>
                                <td>{station.mac_address}</td>
                                <td>{station.temperature}</td>
                                <td>{station.humidity}</td>
                                <td>{station.pressure}</td>
                            </tr>
                            );
                        })
                    }
                    </tbody>
                </table>
            </div>
        );
  }
}

export default StationList;