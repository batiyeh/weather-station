import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, Label, Input} from 'reactstrap';
import AlertCard from './alertCard';
import '../styles/alerts.css';

class AlertsForm extends Component {
    constructor(props){
        super(props);
        this.state={
            modal: false,
            isBetween: false,
            alerts: []
        };
        this.toggleAddAlert = this.toggleAddAlert.bind(this);
        this.toggleValues = this.toggleValues.bind(this);
        
    }
    componentDidMount = async () =>{
        var alerts = await this.getAlerts();
        this.setState({alerts: alerts});
    }
    getAlerts = async () => {
        var alerts = [];
        var response = await fetch('/api/alerts/', {method: 'post', credentials:'include'});
        var body = await response.json();
        alerts = body.alerts;
        
        return alerts;
    }

    toggleAddAlert(){
        this.setState({
            modal: !this.state.modal
        });
    }
    toggleValues(event){
        if(event.target.value === 'between'){
            this.setState({
                isBetween: true
            });
        }
        else{
            this.setState({
                isBetween: false
            })
        }
    }
    renderValues(){
        if(this.state.isBetween){
            return (
            <div className='form-group'> 
                <Label for='values'>Values</Label>
                <Input type='text' name='value1' id='value1'/>
                <Input type='text' name='value2' id='value2'/>
            </div>)
        }
        else{
            return (
            <div className='form-group'> 
                <Label for='values'>Value</Label>
                <Input type='text' name='value1' id='value1'/>
            </div>)
        }
    }
    renderCards(){
        var alertcards = []
        for (var i = 0; i < this.state.alerts.length; i++){
            if(this.state.alerts[i+1]){
                if(this.state.alerts[i].alert_id === this.state.alerts[i+1].alert_id){
                    alertcards.push(<AlertCard alerts={this.state.alerts[i]} upper={this.state.alerts[i+1].value}/>)
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
                <Form id='passwordForm' action='/api/alerts/create' method='post'>
                    <ModalBody>
                        <div className='form-group'>
                            <Label>Data Type</Label>
                            <Input type="select" name='datatype' id='datatype'>
                                <option value='temperature'>Temperature</option>
                                <option value='humidity'>Humidity</option>
                                <option value='pressure'>Pressure</option>
                            </Input>
                        </div>
                        <div className='form-group'>
                            <Label>Keyword</Label>
                            <Input type='select' onChange={this.toggleValues} name='keyword' id='keyword'>
                                <option value='above'>Above</option>
                                <option value='below'>Below</option>
                                <option value='between'>Between</option>
                            </Input>

                        </div>
                        {this.renderValues()}

                    </ModalBody>
                    <ModalFooter>
                            <Button type='submit' color="primary" className="primary-themed-btn" >Create Alert</Button>{' '}
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