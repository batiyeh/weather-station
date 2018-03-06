import React, { Component, PureComponent } from 'react';
import GoogleMap from 'google-map-react';
import '../../styles/map.css';

export class Marker extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const height = 40;
        const width = 40;

        const markerStyle = {
            position: 'absolute',
            width: width,
            height: height,
            left: -width / 2,
            top: -height / 2,

            border: '5px solid #f44336',
            borderRadius: height,
            backgroundColor: 'white',
            textAlign: 'center',
            color: '#3f51b5',
            fontSize: 16,
            fontWeight: 'bold',
            padding: 4
        };

        return (
            <div style={markerStyle} className="marker-container">
                {this.props.text}
            </div>
        ); 
    }

}
export default Marker