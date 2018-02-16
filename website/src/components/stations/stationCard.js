import React, { Component } from 'react';
import '../../styles/stations.css';
import { Card, CardText, CardTitle } from 'reactstrap';
import ConnectionIndicator from './connectionIndicator';

class StationCard extends Component {
    // Format the station's uptime for user viewing
    // TODO: Make this uptime not just last time data was received
    getUptime() {
        var updatedAt = new Date(this.props.station.updated_at)
        var updatedString = updatedAt.getHours() + ":" + updatedAt.getMinutes() + ":" + updatedAt.getSeconds();
        return updatedString;
    }

    // TODO: Check the last time we received data from 
    // this station and decide the color of the status
    getConnectionStatus(){
        return 'green';
    }

    render() {
        return (
            <div className="col-12 station-container">
                <Card className="station-card">
                    <div className="col-12">
                        <CardTitle>
                            <div className="row">
                                <div className="col-6 no-padding-left">
                                    <p class="station-name">
                                        <ConnectionIndicator status={this.getConnectionStatus()}></ConnectionIndicator>
                                        {this.props.station.station_name}
                                    </p>
                                </div>
                                <div className="col-6 no-padding-right">
                                    <p class="station-uptime">{this.getUptime()}</p>
                                </div>
                            </div>
                        </CardTitle>
                        <CardText className="bottom-card">
                            <div className="row">
                                {/* Holds station data on the left side of the card */}
                                <div className="col-6 no-padding-left">
                                    <p class="station-info">temperature: {this.props.station.temperature} &deg;F</p>
                                    <p class="station-info">pressure: {this.props.station.pressure} hPa</p>
                                    <p class="station-info">humidity: {this.props.station.humidity}%</p>
                                </div>
                                {/* Holds API data on the right side of the card */}
                                <div className="col-6 no-padding-right">
                                   
                                </div>
                            </div>
                        </CardText>
                    </div>
                </Card>
            </div>
        );
    }
}

export default StationCard;
