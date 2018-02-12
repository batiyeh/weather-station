import React, { Component } from 'react';


class StationTable extends Component {
    constructor() {
        super();
        this.state = {
            stations: [],
            secondsElapsed: 0
        };
    }

    getInitialState() {
        return {
            stations: [],
            secondsElapsed: 0
        };
    }

    componentDidMount() {
        this.getStations().then(res => { 
            this.setState({ stations: res.stations });
        });
        this.interval = setInterval(this.updateStations, 5000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    updateStations = () => {
        this.getStations().then(res => {
            this.setState({ 
                stations: res.stations, 
                secondsElapsed: this.state.secondsElapsed + 5
            });
        });
    }
    
    getStations = async () => {
        const response = await fetch('/api/stations');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);

        return body;
    };
    
    render() {
        return (
            <div className="container content">
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

export default StationTable;