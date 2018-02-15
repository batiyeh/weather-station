import React, { Component } from 'react';
import '../styles/stations.css';
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button } from 'reactstrap';

class StationCard extends Component {
    render() {
        return (
            <div className="col-12 station-container">
                <Card className="station-card">
                    <div className="col-12">
                        <CardTitle>{this.props.station.station_name}</CardTitle>
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
