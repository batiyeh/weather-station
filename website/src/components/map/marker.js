import React, { Component } from 'react';
import '../../styles/map.css';

export class Marker extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const height = 40;
        const width = 40;

        const markerContainerStyle = {
            position: 'absolute',
            width: width,
            height: height,
            left: -width / 2,
            top: -height / 2,
            textAlign: 'center',
            padding: 4
        };

        const markerStyle ={
            fontSize: 40,
            fontWeight: 'bold',
            color: '#e06253',
        }

        return (
            <div style={markerContainerStyle} className="marker-container">
                <i style={markerStyle} className="fa fa-map-marker" aria-hidden="true"></i>
            </div>
        ); 
    }

}
export default Marker