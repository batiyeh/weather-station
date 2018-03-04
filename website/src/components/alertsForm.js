import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, Label, Input} from 'reactstrap';
import AlertCard from './alertCard';
import '../styles/alerts.css';

class AlertsForm extends Component {
    constructor(props){
        super(props);
        this.state={
            modal: false,
            station: '',
            datatype: 'temperature',
            keyword: 'above',
            value1: null,
            value2: null,
            alerts: [],
            stations: [],
            email: false,
            sms: false,
            webpage: false,
        };
        this.resetValues = this.resetValues.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onSMSChange = this.onSMSChange.bind(this);
        this.onWebpageChange = this.onWebpageChange.bind(this);
        this.toggleAddAlert = this.toggleAddAlert.bind(this);
        
    }
    componentDidMount = async () =>{
        await this.getAlerts();
    }
    //gets all current alerts for the user and stores it in the state
    getAlerts = async () => {
        var alerts = [];
        var stations = [];
        var response = await fetch('/api/alerts/', {method: 'post', credentials:'include'});
        var body = await response.json();
        alerts = body.alerts;
        stations = body.stations;

        this.setState({alerts: alerts, stations: stations, station:stations[0].station_name});
    }
    //takes the current data in the state and sends it to the backend, the page is then refreshed and the modal is closed
    createAlert = async () => {
        await fetch('/api/alerts/create', 
            {method: 'post', 
            body: JSON.stringify({
                station: this.state.station,
                datatype: this.state.datatype,
                keyword: this.state.keyword,
                value1: this.state.value1,
                value2: this.state.value2,
                email: this.state.email,
                sms: this.state.sms,
                webpage: this.state.webpage
            }),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            credentials:'include'
        });

        await this.getAlerts();
        this.resetValues();
    }
    //toggles modal for creating a new alert
    toggleAddAlert(){
        this.setState({
            modal: !this.state.modal
        });
    }
    //when the user enters information the datatype, keyword, value1, value2 are updated in the state
    onStationChange(value){
        this.setState({
            station: value
        })
    }
    onDatatypeChange(value){
        this.setState({
            datatype: value
        })
    }
    onKeywordChange(value){
        this.setState({
            keyword: value
        })
    }
    onValue1Change(value){
        this.setState({
            value1: value
        })
    }
    onValue2Change(value){
        this.setState({
            value2: value
        })
    }
    onEmailChange(){
        this.setState({
            email: !this.state.email
        })
    }
    onSMSChange(value){
        this.setState({
            sms: !this.state.sms
        })
    }
    onWebpageChange(value){
        this.setState({
            webpage: !this.state.webpage
        })
    }
    //displays either one input box or two to the user depending on what keyword they currently have selected
    renderValues(){
        if(this.state.keyword === 'between'){
            return (
            <div className='form-group'> 
                <Label>Values</Label>
                <Input type='text' name='value1' id='value1' onChange={e => this.onValue1Change(e.target.value)}/>
                <Input type='text' name='value2' id='value2'onChange={e => this.onValue2Change(e.target.value)}/>
            </div>)
        }
        else{
            if(this.state.value2){
                this.setState({
                    value2: null
                });
            }
            return (
            <div className='form-group'> 
                <Label>Value</Label>
                <Input type='text' name='value1' id='value1' onChange={e => this.onValue1Change(e.target.value)}/>
            </div>)
        }
    }
    //parses the current cards in this.state.alerts
    //some alerts have multiple values so the id's need to be compared before they are added to the array
    renderCards(){
        var alertcards = []
        for (var i = 0; i < this.state.alerts.length; i++){
            if(this.state.alerts[i+1]){
                if(this.state.alerts[i].alert_id === this.state.alerts[i+1].alert_id){
                    alertcards.push(<AlertCard stations={this.state.stations} alerts={this.state.alerts[i]} value2={this.state.alerts[i+1].value}/>)
                    i++;
                }
                else{
                    alertcards.push(<AlertCard stations={this.state.stations} alerts={this.state.alerts[i]}/>)
                }
            }
            else{
                alertcards.push(<AlertCard stations={this.state.stations} alerts={this.state.alerts[i]}/>)
            }
        }
        return alertcards
    }
    renderStations(){
        var options = []
        this.state.stations.map(station => {
            options.push(<option value={station.station_name}>{station.station_name}</option>)
        })
        return options;
    }
    resetValues(){
        this.setState({
            modal: false,
            station: this.state.stations[0].station_name,
            datatype: 'temperature',
            keyword: 'above',
            value1: null,
            value2: null,
            email: false,
            sms: false,
            webpage: false,
        })
        this.toggleAddAlert();
    }
    render(){
        return(
            <div className='container'>
            <Modal isOpen={this.state.modal} toggle={this.resetValues}>
                <ModalHeader toggle={this.toggleAddAlert}>Add Alert Trigger</ModalHeader>
                <Form>
                    <ModalBody>
                        <div className ='form-group'>
                            <Label>Alert Method</Label>
                            <div className='row'>
                                <div className='form-check form-check-inline alert-method-container'>
                                    <Label>Email</Label>
                                    <Input type='checkbox' className='form-control alert-method-box' checked={this.state.email} onChange={this.onEmailChange} id='email' name='email'/>
                                </div>
                                <div className='form-check form-check-inline alert-method-container'>    
                                    <Label>SMS</Label>
                                    <Input type='checkbox' className='form-control alert-method-box' checked={this.state.sms} onChange={this.onSMSChange} id='sms' name='sms'/>
                                </div>
                                    <Label>Webpage</Label>
                                <div className='form-check form-check-inline alert-method-container'>
                                    <Input type='checkbox' className='form-control alert-method-box' checked={this.state.webpage} onChange={this.onWebpageChange} id='webpage' name='webpage'/>
                                </div>
                            </div>
                        </div>
                        <div className='form-group'>
                            <Label>Station</Label>
                            <Input type="select" name='station' id='station' onChange={e => this.onStationChange(e.target.value)}>
                                {this.renderStations()}
                            </Input>
                        </div>
                        <div className='form-group'>
                            <Label>Data Type</Label>
                            <Input type="select" name='datatype' id='datatype' onChange={e => this.onDatatypeChange(e.target.value)}>
                                <option value='temperature'>Temperature</option>
                                <option value='humidity'>Humidity</option>
                                <option value='pressure'>Pressure</option>
                            </Input>
                        </div>
                        <div className='form-group'>
                            <Label>Keyword</Label>
                            <Input type='select' name='keyword' id='keyword' onChange={e => this.onKeywordChange(e.target.value)}>
                                <option value='above'>Above</option>
                                <option value='below'>Below</option>
                                <option value='between'>Between</option>
                            </Input>

                        </div>
                        {this.renderValues()}
                    </ModalBody>
                    <ModalFooter>
                            <Button type='button' color="primary" onClick={this.createAlert} className="primary-themed-btn" >Create Alert</Button>{' '}
                            <Button type='button' color="secondary" onClick={this.resetValues}>Cancel</Button>
                    </ModalFooter>
                </Form>
            </Modal>
                <div className='row'>
                    {this.renderCards()}
                </div>
                <div className='row'>
                    <button type='button' className="btn btn-secondary btn-block profile-btn" onClick={this.toggleAddAlert}>Create Alert</button>
                </div>
            </div>
        )
    }
}

export default AlertsForm;