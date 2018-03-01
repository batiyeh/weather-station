import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Label, Input} from 'reactstrap';
import '../styles/alerts.css';

class AlertsForm extends Component {
    constructor(props){
        super(props);
        this.state={
            modal: false,
            isBetween: false
        };
        
        this.toggleAddAlert = this.toggleAddAlert.bind(this);
        this.toggleValues = this.toggleValues.bind(this);
    }
    toggleAddAlert(){
        this.setState({
            modal: !this.state.modal
        });
    }
    toggleValues(event){
        console.log(event.target.value);
        if(event.target.value === 'Between'){
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
            </div>
            )
        }
    }
    render(){
        return(
            <div className='container'>
            <Modal isOpen={this.state.modal} toggle={this.toggleAddAlert}>
                <ModalHeader toggle={this.toggleAddAlert}>Add Alert Trigger</ModalHeader>
                <form id='passwordForm' action='' method='post'>
                    <ModalBody>
                        <div className='form-group'>
                            <Label for='datatype'>Data Type</Label>
                            <Input type="select" name='datatype' id='datatype'>
                                <option>Temperature</option>
                                <option>Humidity</option>
                                <option>Pressure</option>
                            </Input>
                        </div>
                        <div className='form-group'>
                            <Label for='keyword'>Keyword</Label>
                            <Input type='select' onChange={this.toggleValues} name='keyword' id='keyword'>
                                <option>Above</option>
                                <option>Below</option>
                                <option>Between</option>
                            </Input>

                        </div>
                        {this.renderValues()}

                    </ModalBody>
                    <ModalFooter>
                            <Button type='submit' color="primary" className="primary-themed-btn" >Create Alert</Button>{' '}
                            <Button type='button' color="secondary" onClick={this.toggleAddAlert}>Cancel</Button>
                    </ModalFooter>
                </form>
            </Modal>
                <div class="row">
                    <div class="col-4">
                        <div class="form-check form-check-inline alert-method-container">
                            <input type='checkbox' class="form-control alert-method-box" id='email' name='email' value='email'/>
                            <label class="form-check-label" for="email">email</label>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="form-check form-check-inline alert-method-container">
                            <input type='checkbox' class="form-control alert-method-box" id='sms' name='sms' value='sms'/>
                            <label class="form-check-label" for="sms">sms</label>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="form-check form-check-inline alert-method-container">
                            <input type='checkbox' class="form-control alert-method-box" id='webpage' name='webpage' value='webpage'/>
                            <label class="form-check-label" for="webpage">webpage</label>
                        </div>
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