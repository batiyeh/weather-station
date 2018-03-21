import React, { Component } from 'react';
import { Alert, Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Form, Label, Input} from 'reactstrap';
import AlertCard from './alertCard';
import HistoricAlertCard from './historicAlertCard';
import DatePicker  from 'react-datepicker'

import '../../styles/alerts.css';
const moment = require('moment');
moment().format();

class AlertsList extends Component {
    constructor(props){
        super(props);
        var now = moment();
        var ymd = now.format('YY-MM-DD');
        var date = new Date('20'+ ymd + 'T04:00:00.000Z')

        this.state={
            modal: false,
            station: '',
            datatype: 'temperature',
            keyword: 'above',
            value: null,
            secondValue: null,
            alerts: [],
            stations: [],
            historicAlerts: [],
            email: true,
            sms: false,
            webpage: false,
            threshold: '1 hour',
            date: date
        };
        console.log('now: ',now.format("YYYY-MM-DD HH:mm:ss"));
        this.filter = this.filter.bind(this);
        this.resetValues = this.resetValues.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onSMSChange = this.onSMSChange.bind(this);
        this.onWebpageChange = this.onWebpageChange.bind(this);
        this.toggleAddAlert = this.toggleAddAlert.bind(this);
        
    }
    //when component loads, will call getAlerts()
    componentDidMount = async () =>{
        await this.getAlerts();

    }
    //gets all current alerts, historic alerts, and stations for the user and stores it in the state
    getAlerts = async () => {
        var alerts = [];
        var stations = [];
        var station = '';
        var historicAlerts = [];
        var response = await fetch('/api/alerts/', {method: 'post', credentials:'include'});
        var body = await response.json();
        alerts = body.alerts;
        stations = body.stations;
        historicAlerts = body.historicAlerts;
        if (stations.length > 0) station = stations[0].station_name;
        //puts alerts, historicAlerts, and stations in state. Sets station to first station in stations array
        this.setState({alerts: alerts, stations: stations, historicAlerts: historicAlerts, station:station});
    }

    //takes the current data in the state and sends it to the backend, the current alerts are updated and the modal is closed
    createAlert = async () => {
        await fetch('/api/alerts/create', 
            {method: 'post', 
            body: JSON.stringify({
                station: this.state.station,
                datatype: this.state.datatype,
                keyword: this.state.keyword,
                value: this.state.value,
                secondValue: this.state.secondValue,
                email: this.state.email,
                sms: this.state.sms,
                webpage: this.state.webpage,
                threshold : this.state.threshold
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
    //when the user enters information the datatype, keyword, value1, value2, email, sms, and webpage are updated in the state
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
    onValueChange(value){
        this.setState({
            value: value
        })
    }
    onSecondValueChange(value){
        this.setState({
            secondValue: value
        })
    }
    onEmailChange(){
        this.setState({
            email: !this.state.email
        })
    }
    onSMSChange(){
        this.setState({
            sms: !this.state.sms
        })
    }
    onWebpageChange(){
        this.setState({
            webpage: !this.state.webpage
        })
    }
    onThresholdChange(value){
        this.setState({
            threshold: value
        })
    }
    filter(value){
        this.setState({
            date: value._d
        })
    }
    //displays either one input box or two to the user depending on what keyword they currently have selected
    renderValues(){
        if(this.state.keyword === 'between'){
            return (
                <div>
                    <div className='form-group'> 
                        <Label>Values</Label>
                        <Input type='text' name='value' id='value' onChange={e => this.onValueChange(e.target.value)}/>
                    </div>
                    <div className='form-group'>
                        <Input type='text' name='secondValue' id='secondValue' onChange={e => this.onSecondValueChange(e.target.value)}/>
                    </div>
                </div>
            );
        }
        else{  
            //ensures state of value2 is reset when switching between renders
            if(this.state.secondValue){
                this.setState({
                    secondValue: null
                });
            }
            return (
            <div className='form-group'> 
                <Label>Value</Label>
                <Input type='text' name='value' id='value' onChange={e => this.onValueChange(e.target.value)}/>
            </div>)
        }
    }
    renderCreateButton(){
        if(this.state.stations.length === 0){
            return <Button type='button' className="btn btn-secondary add-btn" onClick={this.toggleAddAlert} disabled>Add</Button>
        }
        else{
            return <Button type='button' className="btn btn-secondary add-btn" onClick={this.toggleAddAlert}>Add</Button>
 
        }
    }
    //parses the current cards in this.state.alerts
    //some alerts have multiple values so the id's need to be compared before they are added to the array
    renderCards(){
        var cards = []
        this.state.alerts.map(alert =>{
            cards.push(<AlertCard stations={this.state.stations} alerts={alert} update={this.getAlerts}/>)
        })

        return cards
    }
    renderHistoricCard(){
        var cards = []
        this.state.historicAlerts.map(alert => {

            var alertDate = new Date(alert.triggered_at.slice(0,10)+'T04:00:00.000Z');
            //only renders alerts for selected time by user
            if(this.state.date.getTime() === alertDate.getTime() ){
                cards.push(<HistoricAlertCard alert={alert}/>)
            }
        })
        
        if(cards.length === 0){
            return (
                <div class="col-12">
                    <Alert className="no-alerts-alert" color="primary">
                        There are no alerts for this date.
                    </Alert>
                </div>      
            )
        }
        else{
              return cards;
        }
    }
    //populates the station name dropdown with all stations
    renderStations(){
        var options = []
        this.state.stations.map(station => {
            options.push(<option value={station.station_name}>{station.station_name}</option>)
            return null;
        })
        return options;
    }
    //if there are no alerts for that user, this will be rendered on the page
    renderEmpty(){
        if (this.state.alerts.length === 0){
            return (
                <div class="col-12">
                    <Alert className="no-alerts-alert" color="primary">
                        There are no alerts to display.
                    </Alert>
                </div>
            );
        }
    }
    //when the user closes the modal, the state is reset back to default values
    resetValues(){
        this.setState({
            modal: false,
            station: this.state.stations[0].station_name,
            datatype: 'temperature',
            keyword: 'above',
            value: null,
            secondValue: null,
            email: true,
            sms: false,
            webpage: false,
            threshold: '1 hour'
        })
        this.toggleAddAlert();
    }
    render(){
        return(
            <div className='container alert-container'>
            <Modal isOpen={this.state.modal} toggle={this.resetValues}>
                <ModalHeader toggle={this.toggleAddAlert}>Add Alert Trigger</ModalHeader>
                <Form>
                    <ModalBody>
                        <div className ='form-group'>
                            <Label>Alert Method</Label>
                            <div className='col-12 row'>
                                <div className='alert-method-box alert-method-container'>
                                    <FormGroup check>
                                        <Label check>
                                            <Input type='checkbox' className='form-control alert-method-box' checked={this.state.email} onChange={this.onEmailChange} id='email' name='email'/>
                                            <span>Email</span>
                                        </Label>
                                    </FormGroup>
                                </div>
                                <div className='alert-method-box alert-method-container'> 
                                    <FormGroup check>   
                                        <Label check>
                                            <Input type='checkbox' className='form-control alert-method-box' checked={this.state.sms} onChange={this.onSMSChange} id='sms' name='sms'/>
                                            <span>SMS</span>
                                        </Label>
                                    </FormGroup>
                                </div>
                                <div className='alert-method-box alert-method-container'>
                                    <FormGroup check>
                                        <Label check>
                                            <Input type='checkbox' className='form-control alert-method-box' checked={this.state.webpage} onChange={this.onWebpageChange} id='webpage' name='webpage'/>
                                            <span>Webpage</span>
                                        </Label>
                                    </FormGroup>
                                </div>
                            </div>
                        </div>
                        <div className='form-group'>
                            <Label>Alert me once every</Label>
                            <Input type="select" name='threshold' id='threshold' onChange={e => this.onThresholdChange(e.target.value)}>
                                <option value='1 hour'>1 Hour</option>
                                <option value='12 hours'>12 Hours</option>
                                <option value='24 hours'>24 Hours</option>
                            </Input>
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
                <div className="row col-12 alert-list-header">
                    <div className="col-8 left alert-title">
                        <h4>Alert me when...</h4>
                    </div>
                    <div className="col-4 right no-padding-right">
                        {this.renderCreateButton()}
                    </div>
                </div>
                <div className='row'> 
                    {this.renderCards()}
                    {this.renderEmpty()}
                </div>            
                <div className="row col-12 -list-header">
                    <div className='left historic-title'>
                        <h4>Alert History: </h4>
                        <Label>Filter</Label>
                        <DatePicker
                            id='date' 
                            name='date'
                            dateFormat="YYYY-MM-DD"
                            className='form-control'
                            placeholderText="Date"
                            selected={moment(this.state.date)}
                            onChange={this.filter}/>
                    </div>
                    <div className='row'>
                        {this.renderHistoricCard()}
                    </div>
                </div>
            </div>

        )
    }
}

export default AlertsList;