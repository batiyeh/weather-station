import React, { Component } from 'react';
import '../../styles/alerts.css';
import {Button, Card, CardText, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

class HistoricAlertCard extends Component {
    constructor(props){
        super(props);
        this.state={
            station: this.props.alert.station_name,
            type: this.props.alert.type,
            keyword: this.props.alert.keyword,
            temperature: this.props.alert.temperature,
            pressure: this.props.alert.pressure,
            humidity: this.props.alert.humidity,
            value: this.props.alert.value,
            secondValue: this.props.alert.secondValue,
            time: this.props.alert.triggered_at,
            modal: false
        };
        this.toggle = this.toggle.bind(this);
    }
    toggle(){
        console.log('asdf');
        this.setState({
            modal: !this.state.modal
        })
    }
    getParams(){
        if(this.state.keyword === 'between'){
            return(
                <div> {this.state.station}'s {this.state.type} is {this.state.keyword} {this.state.value} and {this.state.secondValue} </div>
            )
        }
        else{
            return(
                <div> {this.state.station}'s {this.state.type} is {this.state.keyword} {this.state.value} </div>

            )
        }
    }
    render(){
        return(
            <div className='container'>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>{this.getParams()}</ModalHeader>
                    <ModalBody>
                        <p>Weather Data for {this.state.station} at {this.state.time}:</p>
                        <p>Temperature: {this.state.temperature}</p>
                        <p>Pressure: {this.state.pressure}</p>
                        Humidity: {this.state.humidity}
                    </ModalBody>
                    <ModalFooter>
                        <Button type='button' color='secondary' onClick={this.toggle}>Close</Button>
                    </ModalFooter>
                </Modal>
                <Card onClick={this.toggle} className='alertCard'>
                    <CardText className='cardText'>
                        {this.getParams()}
                    </CardText>
                </Card>
            </div>
        )
    }
}
export default HistoricAlertCard;