import React, { Component } from 'react';
import { Button, Alert, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import AdminStationCard from './adminStationCard'
const crypto = require('crypto');

// Station List component is a list of each station
// Each connected station is built out of a single Station component in a loop here
class AdminStationList extends Component {
    // Constructor called when the component is loaded in
    constructor() {
        super();
        this.state = {
            stations: [],
            modal: false,
            apikey: '',
            name: ''
        };
        this.toggleAddStationModal = this.toggleAddStationModal.bind(this);
    }

    // Sets the initial state of the component to be null/0 so 
    // we can update it later
    getInitialState() {
        return {
            stations: [],
        };
    }

    // Called when the component is first "mounted" (loaded) into the page
    // This fetches the stations from our API and adds them to our current state
    componentDidMount() {
        this.getStations().then(stations => { 
            this.setState({ stations: stations });
        });
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
        
        return stations;
    };

    // Post request to add the new station to the database
    addStation = async() => {
        var response = await fetch('/api/stations/', 
            {method: 'post', 
             body: JSON.stringify({station_name: this.state.name, api_key: this.state.apikey}),
             headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
              }
        });
        var body = await response.json();
        this.setState({name: ''});
        this.toggleAddStationModal();
        this.updateStations();
        return body;
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

    // Set the state of the added station name
    onNameChange(value){
        this.setState({
             name: value
        });
    }

    // Create a random API key of length 10 and open the modal
    toggleAddStationModal(){
        crypto.randomBytes(10, function(err, buf){
            var token = buf.toString('hex');
            this.setState({
                modal: !this.state.modal,
                apikey: token
            });
        }.bind(this));
    }

    render() {
        return (
            <div className="container content">
                <Modal isOpen={this.state.modal} toggle={this.toggleAddStationModal}>
                    <ModalHeader toggle={this.toggleAddStationModal}>Add a Station</ModalHeader>
                        <ModalBody>
                            <form className="add-station-form">
                                <div className='form-group'>
                                    <label>Name:</label>
                                    <input id='station_name' name='station_name' type='text' className='form-control' placeholder='Name' onChange={e => this.onNameChange(e.target.value)} value={this.state.name}/>
                                </div>
                                <div className='form-group'>
                                    <label>API Key:</label>
                                    <input id='api_key' name='api_key' type='text' className='form-control' placeholder='' value={this.state.apikey} disabled/>
                                </div>
                            </form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" type="button" onClick={this.addStation} className="primary-themed-btn">Submit</Button>{' '}
                            <Button color="secondary" type="button" onClick={this.toggleAddStationModal}>Cancel</Button>
                        </ModalFooter>
                </Modal>
                <div className="row col-12 station-list-header">
                    <div className="col-8 left">
                        <h3>Stations</h3>
                    </div>
                    <div className="col-4 right">
                        <Button onClick={this.toggleAddStationModal} className="btn btn-primary add-btn">Add</Button>
                    </div>
                </div>
                { this.state.stations
                    .map(station => {
                        return (
                            <AdminStationCard key={station.station_name} station={station}></AdminStationCard>
                        );
                    }) 
                }   
                { this.renderAlert() }
            </div>
        );
  }
}

export default AdminStationList;