import React, { Component } from 'react';
import '../../styles/stations.css';
import { Input, Button, Card, CardText, CardTitle, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ConnectionIndicator from './connectionIndicator';
var moment = require('moment');
moment().format();

class StationCard extends Component {
    constructor(props){
        super(props);
        this.state = {
            visibility: "n/a",
            wind_speed: "n/a",
            wind_direction: "n/a",
            modal: false,
            name: this.props.station.station_name
        }

        this.toggleStationDetail = this.toggleStationDetail.bind(this);
    }

    // Called when the component is first "mounted" (loaded) into the page
    // This fetches the stations from our API and adds them to our current state
    componentDidMount() {
        if (this.props.station.latitude !== "n/a" && this.props.station.longitude !== "n/a"){
            this.setState({
                visibility: this.props.station.visibility,
                wind_speed: this.props.station.wind_speed,
                wind_direction: this.props.station.wind_direction,
            })
        }
    }

    // Each time the station list updates, pass down the new 
    // props (station name in this case)
    componentWillReceiveProps(nextProps) {
        if ((this.state.name !== nextProps.station.station_name) && this.state.modal === false){
            this.onNameChange(nextProps.station.station_name);
        }

        if (this.props.station.latitude !== "n/a" && this.props.station.longitude !== "n/a"){
            this.setState({
                visibility: nextProps.station.visibility,
                wind_speed: nextProps.station.wind_speed,
                wind_direction: nextProps.station.wind_direction,
            })
        }
    }
    
    // Format the station's uptime for user viewing
    // TODO: Make this uptime not just last time data was received
    getUptime() {
        var uptime = "";
        if (this.props.station.connected){
            uptime = moment().diff(moment(this.props.station.last_connected))
            uptime = moment.utc(uptime).format("HH:mm:ss");
        }
        return uptime;
    }

    // Toggle the station detail modal open/closed
    toggleStationDetail(){
        this.setState({
            modal: !this.state.modal
        });
    }

    saveStationName = async() => {
        var response = await fetch('/api/stations/' + this.props.station.apikey, 
            {method: 'put', 
             body: JSON.stringify({station_name: this.state.name}),
             headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
              }
        });
        var body = await response.json();
        this.toggleStationDetail();
        return body;
    }

    // If the latitude and longitude are valid, we will render 
    // the additional Open Weather Map data on the right side of the card.
    renderAdditionalData(){
        if (this.props.station.latitude !== "n/a" && this.props.station.longitude !== "n/a"){
            return (
                <div className="col-6 no-padding-right">
                    <p className="station-info">visibility: {this.state.visibility} m</p>
                    <p className="station-info">wind speed: {this.state.wind_speed} mph</p>
                    <p className="station-info">wind direction: {this.state.wind_direction}&deg;</p>
                </div>
            )
        }
    }

    // Update the station name state on input change
    onNameChange(value){
        this.setState({
             name: value
        });
    }
    
    // Render the station name input with or without a value if it exists
    renderNameInput(){
        if (this.state.name !== undefined || this.state.name !== ""){
            return <Input type="text" className="stationNameInput" name="stationNameInput" id="stationNameInput" placeholder="Name" onChange={e => this.onNameChange(e.target.value)} value={this.state.name}></Input>
        }

        else{
            return <Input type="text" className="stationNameInput" name="stationNameInput" id="stationNameInput" onChange={e => this.onNameChange(e.target.value)} placeholder="Name"></Input>
        }
    }

    // If there is no station name, render the mac address
    // Otherwise, render the station name
    renderStationName(){
        if (this.state.name != null){
            return this.state.name;
        }

        else {
            return this.props.station.mac_address;
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
                                <span className="left">Temperature</span>
                                <span className="right">{this.props.station.temperature} &deg;F</span>
                            </div><br/>
                            <div className="station-detail-row">
                                <span className="left">Pressure</span>
                                <span className="right">{this.props.station.pressure} hPa</span>
                            </div><br/>
                            <div className="station-detail-row">
                                <span className="left">Humidity</span>
                                <span className="right">{this.props.station.humidity}%</span>
                            </div><br/>
                            <div className="station-detail-row">
                                <span className="left">Location</span>
                                <span className="right">({this.props.station.latitude}, {this.props.station.longitude})</span>
                            </div><br/>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" className="primary-themed-btn" onClick={this.saveStationName}>Save Changes</Button>{' '}
                        <Button color="secondary" onClick={this.toggleStationDetail}>Cancel</Button>
                    </ModalFooter>
                </Modal>

                <Card onClick={this.toggleStationDetail} className="station-card">
                    <div className="col-12">
                        <CardTitle>
                            <div className="row">
                                <div className="col-8 no-padding-left">
                                    <p className="station-name">
                                        <ConnectionIndicator updated={this.props.station.created_at} connected={this.props.station.connected} apikey={this.props.station.apikey}></ConnectionIndicator>
                                        { this.renderStationName() }
                                    </p>
                                </div>
                                <div className="col-4 no-padding-right">
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
