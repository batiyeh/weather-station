import React, { Component } from 'react';
import { averagesStyle } from './markerStyles'
import _ from 'lodash';
import '../../styles/map.css';

class AveragesMarker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            averages: this.props.averages,
            show: this.props.show,
        }
    }

    // Update the hover status when mousing over this marker
    componentWillReceiveProps(nextProps){
        if (this.state.averages !== nextProps.averages){
            this.setState({ averages: nextProps.averages });
        }

        if (nextProps.show !== this.state.show){
            this.setState({ show: nextProps.show });
        }
    }

    renderAverages(){
        var temperature = this.state.averages.temperature.toFixed(2);
        var pressure = this.state.averages.pressure.toFixed(2);
        var humidity = this.state.averages.humidity.toFixed(2)

        if (_.isNaN(this.state.averages.temperature)) temperature = 0.0;
        if (_.isNaN(this.state.averages.pressure)) pressure = 0.0;
        if (_.isNaN(this.state.averages.humidity)) humidity = 0.0;

        return (
            <div>
                <p className="marker-info-text">temperature: {temperature} &deg;F</p>
                <p className="marker-info-text">pressure: {pressure} hPa</p>
                <p className="marker-info-text">humidity: {humidity}%</p>
            </div>
        );
    }

    render() {
        if (this.state.show){
            return (
                <div style={averagesStyle} className="averages-container">
                    <p className="marker-info-title">Weather Averages</p>
                    { this.renderAverages() }
                </div>
            ); 
        }

        else return null;
    }

}

export default AveragesMarker;