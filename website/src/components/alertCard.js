import React, { Component } from 'react';

import { Input, Button, Card, CardText, Modal, ModalHeader, ModalBody, ModalFooter, Label, Form} from 'reactstrap';

class AlertCard extends Component {
    constructor(props){
        super(props);
        this.state = {
            modal: false,
            keyword: this.props.alerts.keyword,
            datatype: this.props.alerts.datatype,
            value1: this.props.alerts.value,
            value2: this.props.value2,
            // postString: '/api/alerts/' + this.props.alerts.alert_id
        }
        this.toggleAlert = this.toggleAlert.bind(this);
        this.toggleValues = this.toggleValues.bind(this);
    }
    updateAlert = async () => {
    await fetch('/api/alerts/' + this.props.alerts.alert_id, 
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
    this.toggleAlert();

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
    getParams(){
        if(this.props.value2){
            return(
                <div> {this.props.alerts.type} {this.props.alerts.keyword} {this.props.alerts.value} {this.props.value2} </div>
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
                    <Form id='AlertForm'>
                        <ModalBody>
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
                                <Button type='button' color="primary" onClick={this.updateAlert} className="primary-themed-btn" >Update Alert</Button>{' '}
                                <Button type='button' color="secondary" onClick={this.toggleAlert}>Cancel</Button>
                        </ModalFooter>
                    </Form>
                </Modal>
                <Card onClick={this.toggleAlert} className='alertCard'>
                    <CardText className='cardText'>
                            {this.getParams()}
                    </CardText>
                </Card>
            </div>
        )
    }

}
export default AlertCard;