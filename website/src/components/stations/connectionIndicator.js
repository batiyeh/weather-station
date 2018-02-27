import React, { Component } from 'react';
import '../../styles/stations.css';
var moment = require('moment');
moment().format();

class ConnectionIndicator extends Component {
    constructor(props){
        super(props);
        var connectionStatusColor = this.getStatusColor(this.props.updated);
        this.state = {
            color: connectionStatusColor
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

        // If the last updated time was within the last 4 seconds 
        // the status color is green
        if (((moment() - moment(updated)) > 0) &&
                ((moment() - moment(updated)) < 4000)){
            connectionStatusColor = '#48db28';
        } 

        // If the last updated time was between the last 4 and 30 seconds,
        // the status color is yellow
        else if (((moment() - moment(updated)) < 30000) &&
                    ((moment() - moment(updated)) > 4000)) {
            connectionStatusColor = '#fffa00';
        }

        // If it has been more than 30 seoconds, color is red.
        else if ((moment() - moment(updated)) > 30000) {
            connectionStatusColor = '#e21f1f';
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
