import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, Label, Input} from 'reactstrap';
import AlertCard from './alertCard';
import '../styles/alerts.css';

class AlertsForm extends Component {
    constructor(props){
        super(props);
        this.state={
            modal: false,
            datatype: 'temperature',
            keyword: 'above',
            value1: null,
            value2: null,
            alerts: []
        };
        this.toggleAddAlert = this.toggleAddAlert.bind(this);
        
    }
    componentDidMount = async () =>{
        await this.getAlerts();
    }
    getAlerts = async () => {
        var alerts = [];
        var response = await fetch('/api/alerts/', {method: 'post', credentials:'include'});
        var body = await response.json();
        alerts = body.alerts;
        
        this.setState({alerts: alerts});

    }
    createAlert = async () => {
        await fetch('/api/alerts/create', 
            {method: 'post', 
            body: JSON.stringify({
                datatype: this.state.datatype,
                keyword: this.state.keyword,
                value1: this.state.value1,
                value2: this.state.value2
            }),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            credentials:'include'
        });

        await this.getAlerts();
        this.toggleAddAlert();
    }
    toggleAddAlert(){
        this.setState({
            modal: !this.state.modal
        });
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
    renderValues(){
        if(this.state.keyword === 'between'){
            return (
            <div className='form-group'> 
                <Label for='values'>Values</Label>
                <Input type='text' name='value1' id='value1' onChange={e => this.onValue1Change(e.target.value)}/>
                <Input type='text' name='value2' id='value2'onChange={e => this.onValue2Chage(e.target.value)}/>
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
                <Label for='values'>Value</Label>
                <Input type='text' name='value1' id='value1' onChange={e => this.onValue1Change(e.target.value)}/>
            </div>)
        }
    }
    renderCards(){
        var alertcards = []
        for (var i = 0; i < this.state.alerts.length; i++){
            if(this.state.alerts[i+1]){
                if(this.state.alerts[i].alert_id === this.state.alerts[i+1].alert_id){
                    alertcards.push(<AlertCard alerts={this.state.alerts[i]} value2={this.state.alerts[i+1].value}/>)
                    i++;
                }
                else{
                    alertcards.push(<AlertCard alerts={this.state.alerts[i]}/>)
                }
            }
            else{
                alertcards.push(<AlertCard alerts={this.state.alerts[i]}/>)
            }
        }
        return alertcards
    }
    render(){
        return(
            <div className='container'>
            <Modal isOpen={this.state.modal} toggle={this.toggleAddAlert}>
                <ModalHeader toggle={this.toggleAddAlert}>Add Alert Trigger</ModalHeader>
                <Form>
                    <ModalBody>
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
                            <Button type='button' color="secondary" onClick={this.toggleAddAlert}>Cancel</Button>
                    </ModalFooter>
                </Form>
            </Modal>
                <div class="row">
                    <div class="col-4">
                        <div className="form-check form-check-inline alert-method-container">
                            <input type='checkbox' class="form-control alert-method-box" id='email' name='email' value='email'/>
                            <label class="form-check-label" for="email">email</label>
                        </div>
                    </div>
                    <div class="col-4">
                        <div className="form-check form-check-inline alert-method-container">
                            <input type='checkbox' class="form-control alert-method-box" id='sms' name='sms' value='sms'/>
                            <label class="form-check-label" for="sms">sms</label>
                        </div>
                    </div>
                    <div class="col-4">
                        <div className="form-check form-check-inline alert-method-container">
                            <input type='checkbox' class="form-control alert-method-box" id='webpage' name='webpage' value='webpage'/>
                            <label class="form-check-label" for="webpage">webpage</label>
                        </div>
                    </div>
                    {/* {console.log(this.state.alerts)} */}
                    <div className='row'>
                        {this.renderCards()}
                    </div>
                    <div className='row'>
                        <button type='button' className="btn btn-secondary btn-block profile-btn" onClick={this.toggleAddAlert}>Create Alert</button>

                    </div>
                </div>
                <div id='alerts'>
                </div>
            </div>
        )
    }
}

export default AlertsForm;