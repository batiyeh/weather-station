import React, { Component } from 'react';
import '../../styles/admin.css';
import { Button, Card, CardText, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class AdminStationCard extends Component {
    constructor(props){
        super(props);
        this.state = {
            modal: false,
            name: props.station.station_name,
            key: props.station.key
        }

        this.toggleEditStation = this.toggleEditStation.bind(this);
    }

    // Toggle the station detail modal open/closed
    toggleEditStation(){
        this.setState({
            modal: !this.state.modal
        });
    }

    saveStationName = async() => {
        var response = await fetch('/api/stations/' + this.props.station.key, 
            {method: 'put', 
             body: JSON.stringify({station_name: this.state.name}),
             headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
              }
        });
        var body = await response.json();
        this.toggleEditStation();
        return body;
    }

    // Update the station name state on input change
    onNameChange(value){
        this.setState({
             name: value
        });
    }

    render() {
        return (
            <div className="col-12 admin-station-container">
                <Modal isOpen={this.state.modal} toggle={this.toggleEditStation}>
                    <ModalHeader toggle={this.toggleEditStation}>Station Info</ModalHeader>
                    <ModalBody>
                        <div className='form-group'>
                            <label>Name:</label>
                            <input id='station_name' name='station_name' type='text' className='form-control' placeholder='Name' onChange={e => this.onNameChange(e.target.value)} value={this.state.name}/>
                        </div>
                        <div className='form-group'>
                            <label>API Key:</label>
                            <input id='api_key' name='api_key' type='text' className='form-control' placeholder='' value={this.state.key} disabled/>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" className="primary-themed-btn" onClick={this.saveStationName}>Save Changes</Button>
                        <Button color="secondary" onClick={this.toggleEditStation}>Cancel</Button>
                    </ModalFooter>
                </Modal>

                <Card onClick={this.toggleEditStation} className="admin-station-card">
                    <div className="col-12">
                        <CardText>
                            <div className="row">
                                <div className="col-8 no-padding-left station-title">
                                    { this.state.name }
                                </div>
                                <div className="col-4 no-padding-right right delete-icon">
                                    <span className="delete-btn"><i className="fa fa-times" aria-hidden="true"></i></span>
                                </div>
                            </div>
                        </CardText>
                    </div>
                </Card>
            </div>
        );
    }
}

export default AdminStationCard;
