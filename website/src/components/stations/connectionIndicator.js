import React, { Component } from 'react';
import '../../styles/stations.css';
var moment = require('moment');
moment().format();

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
        this.setConnected(nextProps.connected);
        this.setStatusColor(nextProps.updated);
    }

    setConnected(connected){
        this.setState({connected: connected});
    }

    // Set the state of the status color
    setStatusColor = (updated) => {
        var color = this.getStatusColor(updated);
        this.setState({ color: color});
    }

    // Compare the last updated time with now minus some seconds
    getStatusColor = (updated) => {
        var connectionStatusColor;
        var now = moment();
        
        // If the last updated time was within the last 4 seconds 
        // the status color is green
        if (((now - moment(updated)) >= 0) && 
        ((now - moment(updated)) < 9000)){
            connectionStatusColor = '#48db28';
            if (this.state.connected === 0){
                this.updateConnectedStatus();
            }
        } 

        // If the last updated time was between the last 4 and 30 seconds,
        // the status color is yellow
        else if (((now - moment(updated)) < 30000) && 
        ((now - moment(updated)) > 9000)) {
            connectionStatusColor = '#fffa00';
        }

        // If it has been more than 30 seoconds, color is red.
        else if ((now - moment(updated)) > 30000) {
            connectionStatusColor = '#e21f1f';
            if (this.state.connected === 1){
                this.updateConnectedStatus();
            }
        }

        else {
            connectionStatusColor = '#fffa00';
        }

        return connectionStatusColor;
    }

    updateConnectedStatus = async() => {
        var response = await fetch('/api/stations/connected/' + this.state.apikey, 
            {method: 'put', 
             body: JSON.stringify({
                connected: !this.state.connected,
                last_connected: moment().format("YYYY-MM-DD HH:mm:ss")
            }),
             headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
              }
        });
        var body = await response.json();
        return body;
    }

    render() {
        return (
            <span className="connection-indicator" style={{backgroundColor: this.state.color}}></span>
        );
    }
}

export default ConnectionIndicator;
