import React, { Component } from 'react';
import '../../styles/alerts.css';

import { Input, Button, Card, CardText, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Form} from 'reactstrap';

class AlertCard extends Component {
    constructor(props){
        super(props);
        this.state = {
            modal: false,
            stations: this.props.stations,
            station: this.props.alerts.station_name,
            keyword: this.props.alerts.keyword,
            datatype: this.props.alerts.type,
            value: this.props.alerts.value,
            secondValue: this.props.alerts.secondValue,
            email: false,
            sms: false,
            webpage: false,
            threshold: this.props.alerts.threshold
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

    componentDidMount(){
        this.setAlertMethods();
    }

    //passes the new values to the backend of an alert that the user is editing
    updateAlert = async () => {
        await fetch('/api/alerts/' + this.props.alerts.alert_id, 
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
                threshold: this.state.threshold
            }),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            credentials:'include'
        });
        this.props.update();
        this.toggleAlert();

    }

    setAlertMethods = async() => {
        var {email, webpage, sms} = await this.getAlertMethods();
        this.setState({
            email: email,
            webpage: webpage,
            sms: sms,
            origEmail: email,
            origWebpage: webpage,
            origSms: sms,
        });
    }

    //when the user opens the card modal, a fetch to get the alert methods for that alert is made
    //the state is then updated with that 
    getAlertMethods = async () => {
        var email = false;
        var webpage = false;
        var sms = false;
        var response = await fetch('/api/alerts/' + this.props.alerts.alert_id, {method: 'get'})
        var body = await response.json();
        body.methods.map(methodType => {
            if (methodType.method === 'email') email = true; 
            else if (methodType.method === 'sms') sms = true;
            else if (methodType.method === 'webpage') webpage = true;
        });
        
        return {email, webpage, sms};
    }

    //toggles edit alert modal
    toggleAlert(){
        console.log(this.props.alerts.alert_id, this.state.value);

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

    //if the user has a keyword selected the requires multiple inputs, it will display it dynamically
    renderValues(){
        if(this.state.keyword === 'between'){
            return (
                <div>
                    <div className='form-group'> 
                        <Label>Values</Label>
                        <Input type='text' name='value' id='value' value={this.state.value} onChange={e => this.onValueChange(e.target.value)}/>
                    </div>
                    <div className='form-group'>
                        <Input type='text' name='secondValue' id='secondValue' value={this.state.secondValue} onChange={e => this.onSecondValueChange(e.target.value)}/>
                    </div>
                </div>
            );
        }
        else{
            return (
            <div className='form-group'> 
                <Label>Value</Label>
                <Input type='text' name='value1' id='value' value={this.state.value} onChange={e => this.onValueChange(e.target.value)}/>
            </div>)
        }
    }
    renderStations(){
        var options = []
        this.state.stations.map((station, index) => {
            options.push(<option key={"name" + index} value={station.station_name}>{station.station_name}</option>)
            return null;
        })
        return options;
    }

    renderMethods(){
        var methodTags = [];
        if (this.state.email === true){
            methodTags.push(
                <span key="email-key" className="method-tag">email</span>
            );
        }

        if (this.state.sms === true){
            methodTags.push(
                <span key="sms-key" className="method-tag">sms</span>
            );
        }

        if (this.state.webpage === true){
            methodTags.push(
                <span key="webpage-key" className="method-tag">webpage</span>
            );
        }

        return methodTags;
    }

    //prints out the params currently stored in the state of the card
    getParams(){
        if(this.state.keyword === 'between'){
            return(
                <div> {this.state.station}'s {this.state.datatype} is {this.state.keyword} {this.state.value} and {this.state.secondValue} </div>
            )
        }
        else{
            return(
                <div> {this.state.station}'s {this.state.datatype} is {this.state.keyword} {this.state.value} </div>

            )
        }
    }

    //resets state back to it's default values
    resetValues(){
        this.setState({
            station: this.props.alerts.station_name,
            keyword: this.props.alerts.keyword,
            datatype: this.props.alerts.type,
            value: this.props.alerts.value,
            secondValue: this.props.alerts.secondValue,
            email: this.state.origEmail,
            webpage: this.state.origWebpage,
            sms: this.state.origSms,
            threshold: this.props.alerts.threshold
        })
        this.toggleAlert();
    }

    //Deletes the alert with the id passed to the backend
    //Page does not update after deletion, needs to be fixed
    deleteAlert = async () => {
        // console.log(this.props.alerts.alert_id, this.state.value);
        
        await fetch('/api/alerts/' + this.props.alerts.alert_id, {method: 'delete'})
        this.toggleAlert();
        console.log(this.props.index);
        this.props.deleteAlert(this.props.index);
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
                                <Label>Alert me every...</Label>
                                <Input type="select" name='threshold' id='threshold' value={this.state.threshold} onChange={e => this.onThresholdChange(e.target.value)}>
                                    <option value='1 hour'>1 Hour</option>
                                    <option value='12 hours'>12 Hours</option>
                                    <option value='24 hours'>24 Hours</option>
                                </Input>
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
                <Card onClick={this.toggleAlert} className='alertCard'>
                    <CardText className='cardText'>
                            {this.getParams()}
                            <div className="row">
                                <div className="col-6 alert-method-tags">
                                    {this.renderMethods()}
                                </div>
                                <div className="col-6 right">
                                    <span className="threshold-text">every: 1 hour</span>
                                </div>
                            </div>
                    </CardText>
                </Card>
                
            </div>
        )
    }

}
export default AlertCard;