import React, { Component } from 'react';
import '../../styles/alerts.css';
import {Card, CardText} from 'reactstrap';

class HistoricAlertCard extends Component {
    constructor(props){
        super(props);
        this.state={
            station: this.props.alert.station_name,
            type: this.props.alert.type,
            keyword: this.props.alert.keywords,
            temperature: this.props.alert.temperature,
            pressure: this.props.alert.pressure,
            humidity: this.props.alert.humidity,
            value: this.props.value,
            firstValue: this.props.alert.firstValue,
            secondValue: this.props.alert.secondValue,
            time: this.props.alert.triggered_at,
            modal: false
        };
    }
    toggle(){
        this.setState({
            modal: !this.state.modal
        })
    }
    render(){
        return(
            <div className='container'>
                <Card onclick={this.toggle} className='alertCard'>
                    <CardText className='cardText'>

                    </CardText>
                </Card>
            </div>
        )
    }
}
export default HistoricAlertCard;