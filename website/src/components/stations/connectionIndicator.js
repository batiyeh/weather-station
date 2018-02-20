import React, { Component } from 'react';
import '../../styles/stations.css';

class ConnectionIndicator extends Component {
    // Add a color to the connection indicator when constructed
    // depending on the status prop being passed to it.
    constructor(props){
        super(props);
        var connectionStatusColor;

        if (props.status === "green") connectionStatusColor = '#48db28';
        if (props.status === "yellow") connectionStatusColor = '#fffa00';
        if (props.status === "red") connectionStatusColor = '#e21f1f';

        this.state = {
            color: connectionStatusColor 
        }
    }

    render() {
        return (
            <span className="connection-indicator" style={{backgroundColor:this.state.color}}></span>
        );
    }
}

export default ConnectionIndicator;
