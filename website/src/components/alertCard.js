import React, { Component } from 'react';

import { Input, Button, Card, CardText, Modal, ModalHeader, ModalBody, ModalFooter, Label, Form} from 'reactstrap';

class AlertCard extends Component {
    constructor(props){
        super(props);
        this.state = {
            modal: false,
            isBetween: false
        }
        this.toggleAlert = this.toggleAlert.bind(this);
        this.toggleValues = this.toggleValues.bind(this);
    }
    toggleAlert(){
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
            });
        }
    }
    renderValues(){
        if(this.state.isBetween){
            return (
            <div className='form-group'> 
                <Label>Values</Label>
                <Input type='text' name='value1' id='value1'/>
                <Input type='text' name='value2' id='value2'/>
            </div>)
        }
        else{
            return (
            <div className='form-group'> 
                <Label>Value</Label>
                <Input type='text' name='value1' id='value1'/>
            </div>)
        }
    }
    getParams(){
        if(this.props.upper){
            return(
                <div> {this.props.alerts.type} {this.props.alerts.keyword} {this.props.alerts.value} {this.props.upper} </div>
            )
        }
        else{
            return(
                <div> {this.props.alerts.type} {this.props.alerts.keyword} {this.props.alerts.value} </div>

            )
        }
    }
    render(){
        return(
            <div className='container'>
                <Modal isOpen={this.state.modal} toggle={this.toggleAlert}>
                    <ModalHeader toggle={this.toggleAlert}>Update Alert Trigger</ModalHeader>
                    <Form id='AlertForm' action='/api/alerts/update' method='post'>
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
                                <Button type='submit' color="primary" className="primary-themed-btn" >Update Alert</Button>{' '}
                                <Button type='button' color="secondary" onClick={this.toggleAddAlert}>Cancel</Button>
                        </ModalFooter>
                    </Form>
                </Modal>
                <Card onClick={this.toggleAlert} className='alertCard'>
                    <CardText className='cardText'>
                        <div className='col-12 no-padding-left'>
                            {this.getParams()}
                            {/* {this.props.alerts.type} {this.props.alerts.keyword} {this.props.alerts.value}  */}
                        </div>
                    </CardText>
                </Card>
            </div>
        )
    }

}
export default AlertCard;