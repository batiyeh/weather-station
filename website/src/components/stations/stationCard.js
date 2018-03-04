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
        // this.getAdditionalData();
        // this.interval = setInterval(this.getAdditionalData, 60000);
    }

    // Each time the station list updates, pass down the new 
    // props (station name in this case)
    componentWillReceiveProps(nextProps) {
        if ((this.state.name !== nextProps.station.station_name) && this.state.modal === false){
            this.onNameChange(nextProps.station.station_name);
        }
    }

    // Called when the component is destroyed and removed from the page
    // I am removing the interval so it is not still called after the component disappears.
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    // Format the station's uptime for user viewing
    // TODO: Make this uptime not just last time data was received
    getUptime() {
        var uptime = "";
        if (this.props.station.connected){
            uptime = moment().diff(moment(this.props.station.last_connected))
            uptime = moment.utc(uptime).format("HH:mm:ss");
            // uptime = uptime.hours() + ":" + uptime.minutes() + ":" + uptime.seconds()
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

    // Retrieves additional visibility, wind speed, and wind direction data
    // from Open Weather Map.
    // getAdditionalData = async () => {
    //     if (this.props.station.latitude !== "n/a" && this.props.station.longitude !== "n/a"){
    //         var params = {'lat': this.props.station.latitude,
    //                     'lon': this.props.station.longitude, 
    //                     'units': 'imperial', 
    //                     'appid': process.env.REACT_APP_OPEN_WEATHER_KEY};
    //         var url = "http://api.openweathermap.org/data/2.5/weather?" + $.param(params);
    //         const response = await fetch(url);
    //         const body = await response.json();
    //         if (response.status !== 200) throw Error(body.message); 

    //         this.setState({ 
    //             visibility: body['visibility'], 
    //             wind_speed: body['wind']['speed'],
    //             wind_direction: body['wind']['deg'],
    //         });
    //     }
    // }

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
