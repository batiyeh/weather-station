import React, { Component } from 'react';
import '../../styles/stations.css';
var moment = require('moment');

class ConnectionIndicator extends Component {
    constructor(props){
        super(props);
        this.state = {
            color: '#e21f1f',
            connected: this.props.connected,
            apikey: this.props.apikey
        }
    }

    // Set the status color based on the initial updated time passed
    // to this component
    componentWillMount() {
        this.setStatusColor(this.props.updated);
    }

    // Each time the station card updates, pass down the new 
    // props (updated time in this case)
    componentWillReceiveProps(nextProps) {
        this.setStatusColor(nextProps.updated);
    }

    // Set the state of the status color
    setStatusColor = (updated) => {
        var color = this.getStatusColor(updated);
        this.setState({ color: color});
    }

    // Compare the last updated time with now minus some seconds
    getStatusColor = (updated) => {
        var connectionStatusColor;
        var now = moment().utc();
        updated = moment(updated).utc(updated);
        
        // If the last updated time was within the last 4 seconds 
        // the status color is green
        if (((now - updated) >= 0) && ((now - updated) < 11000)){
            connectionStatusColor = '#48db28';
        } 

        // If the last updated time was between the last 4 and 30 seconds,
        // the status color is yellow
        else if (((now - updated) < 30000) && ((now - updated) > 11000)) {
            connectionStatusColor = '#fffa00';
        }

        // If it has been more than 30 seoconds, color is red.
        else if ((now - updated) > 30000) {
            connectionStatusColor = '#e21f1f';
        }

        else {
            connectionStatusColor = '#fffa00';
        }

        return connectionStatusColor;
    }

    render() {
        return (
            <span className="connection-indicator" style={{backgroundColor: this.state.color}}></span>
        );
    }
}

export default ConnectionIndicator;
