import React, { Component } from 'react';
import '../../styles/stations.css';
import { Input, Button, Card, CardText, CardTitle, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ConnectionIndicator from './connectionIndicator';
import $ from 'jquery';

class StationCard extends Component {
    constructor(props){
        super(props);
        this.getAdditionalData();
        this.state = {
            visibility: "n/a",
            wind_speed: "n/a",
            wind_direction: "n/a",
            modal: false
        }

        this.toggleStationDetail = this.toggleStationDetail.bind(this);
    }
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

    // Toggle the station detail modal open/closed
    toggleStationDetail(){
        this.setState({
            modal: !this.state.modal
        });
    }

    // Retrieves additional visibility, wind speed, and wind direction data
    // from Open Weather Map.
    getAdditionalData = async () => {
        if (this.props.station.latitude !== "n/a" && this.props.station.longitude !== "n/a"){
            var params = {'lat': this.props.station.latitude,
                        'lon': this.props.station.longitude, 
                        'units': 'imperial', 
                        'appid': process.env.REACT_APP_OPEN_WEATHER_KEY};
            var url = "http://api.openweathermap.org/data/2.5/weather?" + $.param(params);
            const response = await fetch(url);
            const body = await response.json();
            if (response.status !== 200) throw Error(body.message); 

            this.setState({ 
                visibility: body['visibility'], 
                wind_speed: body['wind']['speed'],
                wind_direction: body['wind']['deg'],
            });
        }
    }

    // If the latitude and longitude are valid, we will render 
    // the additional Open Weather Map data on the right side of the card.
    renderAdditionalData(){
        if (this.props.station.latitude !== "n/a" && this.props.station.longitude !== "n/a"){
            return (
                <div className="col-6 no-padding-right">
                    <p className="station-info">visibility: {this.state.visibility}</p>
                    <p className="station-info">wind speed: {this.state.wind_speed} mph</p>
                    <p className="station-info">wind direction: {this.state.wind_direction}&deg;</p>
                </div>
            )
        }
    }
    
    // Render the station name input with or without a value if it exists
    renderNameInput(){
        if (this.props.station.station_name !== undefined || this.props.station.station_name !== ""){
            return <Input type="text" className="stationNameInput" name="stationNameInput" id="stationNameInput" placeholder="Name" value={this.props.station.station_name}></Input>
        }

        else{
            return <Input type="text" className="stationNameInput" name="stationNameInput" id="stationNameInput" placeholder="Name"></Input>
        }
    }

    render() {
        return (
            <div className="col-12 station-container">
                <Modal isOpen={this.state.modal} toggle={this.toggleStationDetail}>
                    <ModalHeader toggle={this.toggleStationDetail}>Station Detail View</ModalHeader>
                    <ModalBody>
                        { this.renderNameInput() }
                        <div className="station-detail-container">
                            <div className="station-detail-row">
                                <span className="left">MAC Address</span>
                                <span className="right">{this.props.station.mac_address}</span>
                            </div><br/>
                            <div className="station-detail-row">
                                <span className="left">Temperature</span>
                                <span className="right">{this.props.station.temperature}</span>
                            </div><br/>
                            <div className="station-detail-row">
                                <span className="left">Pressure</span>
                                <span className="right">{this.props.station.pressure}</span>
                            </div><br/>
                            <div className="station-detail-row">
                                <span className="left">Humidity</span>
                                <span className="right">{this.props.station.humidity}</span>
                            </div><br/>
                            <div className="station-detail-row">
                                <span className="left">Location</span>
                                <span className="right">({this.props.station.latitude}, {this.props.station.longitude})</span>
                            </div><br/>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" className="primary-themed-btn" onClick={this.toggleStationDetail}>Save Changes</Button>{' '}
                        <Button color="secondary" onClick={this.toggleStationDetail}>Cancel</Button>
                    </ModalFooter>
                </Modal>

                <Card onClick={this.toggleStationDetail} className="station-card">
                    <div className="col-12">
                        <CardTitle>
                            <div className="row">
                                <div className="col-6 no-padding-left">
                                    <p className="station-name">
                                        <ConnectionIndicator status={this.getConnectionStatus()}></ConnectionIndicator>
                                        {this.props.station.mac_address}
                                    </p>
                                </div>
                                <div className="col-6 no-padding-right">
                                    <p className="station-uptime">{this.getUptime()}</p>
                                </div>
                            </div>
                        </CardTitle>
                        <CardText className="bottom-card">
                            <div className="row">
                                {/* Holds station data on the left side of the card */}
                                <div className="col-6 no-padding-left">
                                    <p className="station-info">temperature: {this.props.station.temperature} &deg;F</p>
                                    <p className="station-info">pressure: {this.props.station.pressure} hPa</p>
                                    <p className="station-info">humidity: {this.props.station.humidity}%</p>
                                </div>
                                {/* Holds API data on the right side of the card */}
                                { this.renderAdditionalData() }
                            </div>
                        </CardText>
                    </div>
                </Card>
            </div>
        );
    }
}

export default StationCard;
