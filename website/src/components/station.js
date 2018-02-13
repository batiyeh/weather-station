import React, { Component } from 'react';
import '../styles/stations.css';

class Station extends Component {
    render() {
        return (
            <div className="col-12 station-container">
                <div className="station-container-left">
                    <span className="station-name"><strong>{this.props.station.station_name}</strong></span>
                </div>
                <div className="station-container-right">
                    {this.props.station.updated_at}
                </div>
            </div>
        );
    }
}

export default Station;
