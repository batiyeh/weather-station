import React, { Component } from 'react';
import '../../styles/alerts.css';

import { Input, Button, Card, CardText, Modal, ModalHeader, ModalBody, ModalFooter, Label, Form} from 'reactstrap';

class AlertCard extends Component {
    constructor(props){
        super(props);
        this.state = {
            modal: false,
            stations: this.props.stations,
            station: this.props.alerts.station_name,
            keyword: this.props.alerts.keyword,
            datatype: this.props.alerts.type,
            value1: this.props.alerts.value,
            value2: this.props.value2,
            email: false,
            sms: false,
            webpage: false
        }
        this.getAlertMethods = this.getAlertMethods.bind(this);
        this.updateAlert = this.updateAlert.bind(this);
        this.toggleAlert = this.toggleAlert.bind(this);
        this.resetValues = this.resetValues.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onSMSChange = this.onSMSChange.bind(this);
        this.onWebpageChange = this.onWebpageChange.bind(this);
        this.deleteAlert = this.deleteAlert.bind(this);
    }
    //passes the new values to the backend of an alert that the user is editing
    updateAlert = async () => {
        await fetch('/api/alerts/' + this.props.alerts.alert_id, 
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
        this.toggleAlert();

    }
    //when the user opens the card modal, a fetch to get the alert methods for that alert is made
    //the state is then updated with that 
    getAlertMethods = async () => {
        var response = await fetch('/api/alerts/' + this.props.alerts.alert_id, {method: 'get'})
        var body = await response.json();
        body.methods.map(methodType=> {
            if(methodType.method === 'email'){
                this.setState({
                    email: true
                })
            }
            else if(methodType.method === 'sms'){
                this.setState({
                    sms: true
                })
            }
            else if(methodType.method === 'webpage'){
                this.setState({
                    webpage: true
                })
            }
        } )
        this.toggleAlert();
    }
    //toggles edit alert modal
    toggleAlert(){
        this.setState({
            modal: !this.state.modal
        });
    }
    //when the user enters a new value, the state is updated with that value
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
    //if the user has a keyword selected the requires multiple inputs, it will display it dynamically
    renderValues(){
        if(this.state.keyword === 'between'){
            return (
            <div className='form-group'> 
                <Label>Values</Label>
                <Input type='text' name='value1' id='value1' value={this.state.value1} onChange={e => this.onValue1Change(e.target.value)}/>
                <Input type='text' name='value2' id='value2' value={this.state.value2} onChange={e => this.onValue2Change(e.target.value)}/>
            </div>)
        }
        else{
            return (
            <div className='form-group'> 
                <Label>Value</Label>
                <Input type='text' name='value1' id='value1' value={this.state.value1} onChange={e => this.onValue1Change(e.target.value)}/>
            </div>)
        }
    }
    renderStations(){
        var options = []
        this.state.stations.map(station => {
            options.push(<option value={station.station_name}>{station.station_name}</option>)
        })
        return options;
    }
    //prints out the params currently stored in the state of the card
    getParams(){
        if(this.state.keyword === 'between'){
            return(
                <div> {this.state.station}'s {this.state.datatype} is {this.state.keyword} {this.state.value1} and {this.state.value2} </div>
            )
        }
        else{
            return(
                <div> {this.state.station}'s {this.state.datatype} is {this.state.keyword} {this.state.value1} </div>

            )
        }
    }
    //resets state back to it's default values
    resetValues(){
        this.setState({
            station: this.props.alerts.station_name,
            keyword: this.props.alerts.keyword,
            datatype: this.props.alerts.type,
            value1: this.props.alerts.value,
            value2: this.props.value2,
            email: false,
            sms: false,
            webpage: false
        })
        this.toggleAlert();
    }
    //Deletes the alert with the id passed to the backend
    //Page does not update after deletion, needs to be fixed
    deleteAlert(){
        fetch('/api/alerts/' + this.props.alerts.alert_id, {method: 'delete'})

        this.toggleAlert();
    }
    render(){
        return(
            <div className='container'>
                <Modal isOpen={this.state.modal} toggle={this.resetValues}>
                    <ModalHeader toggle={this.toggleAlert}>Update Alert Trigger</ModalHeader>
                    <Form id='AlertForm'>
                        <ModalBody>
                            <div className ='form-group'>
                                <Label>Alert Method</Label>
                                <div className='row'>
                                    <div className='form-check form-check-inline alert-method-container'>
                                        <Label>Email
                                        <Input type='checkbox' className='form-control alert-method-box' checked={this.state.email} onChange={this.onEmailChange} id='email' name='email'/>
                                        </Label>
                                    </div>
                                    <div className='form-check form-check-inline alert-method-container'>    
                                        <Label>SMS
                                        <Input type='checkbox' className='form-control alert-method-box' checked={this.state.sms} onChange={this.onSMSChange} id='sms' name='sms'/>
                                        </Label>
                                    </div>
                                    <div className='form-check form-check-inline alert-method-container'>
                                        <Label>Webpage
                                        <Input type='checkbox' className='form-control alert-method-box' checked={this.state.webpage} onChange={this.onWebpageChange} id='webpage' name='webpage'/>
                                        </Label>
                                    </div>
                                </div>
                            </div>
                            <div className='form-group'>
                                <Label>Station</Label>
                                <Input type="select" name='station' id='station' value={this.state.station} onChange={e => this.onStationChange(e.target.value)}>
                                    {this.renderStations()}
                                </Input>
                            </div>
                            <div className='form-group'>
                                <Label>Data Type</Label>
                                <Input type="select" name='datatype' id='datatype' value={this.state.datatype} onChange={e => this.onDatatypeChange(e.target.value)}>
                                    <option value='temperature'>Temperature</option>
                                    <option value='humidity'>Humidity</option>
                                    <option value='pressure'>Pressure</option>
                                </Input>
                            </div>
                            <div className='form-group'>
                                <Label>Keyword</Label>
                                <Input type='select' onChange={this.toggleValues} name='keyword' id='keyword' value={this.state.keyword} onChange={e => this.onKeywordChange(e.target.value)}>
                                    <option value='above'>Above</option>
                                    <option value='below'>Below</option>
                                    <option value='between'>Between</option>
                                </Input>
                            </div>
                            {this.renderValues()}
                        </ModalBody>
                        <ModalFooter>
                            <div className='col-6 left'>
                                <Button type='button' color="danger" onClick={this.deleteAlert}>Delete</Button>
                            </div>
                                <Button type='button' color="primary" onClick={this.updateAlert} className="primary-themed-btn" >Update Alert</Button>{' '}
                                <Button type='button' color="secondary" onClick={this.resetValues}>Cancel</Button>
                        </ModalFooter>
                    </Form>
                </Modal>
                <Card onClick={this.getAlertMethods} className='alertCard'>
                    <CardText className='cardText'>
                            {this.getParams()}
                    </CardText>
                </Card>
                
            </div>
        )
    }

}
export default AlertCard;