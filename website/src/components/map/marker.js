import React, { Component } from 'react';
import { getMarkerStyle, getContainerStyle, FadeAndSlideUp } from './markerStyles'
import '../../styles/map.css';

class Marker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            station: this.props.station,
            hover: this.props.hover
        }
    }

    // Update the hover status when mousing over this marker
    componentWillReceiveProps(nextProps){
        var hover = nextProps.$hover;
        if (hover !== this.state.hover){
            this.updateHover(hover);
        }
    }

    // Updates the hover state attribute
    updateHover(hover) {
        this.setState({
            hover: hover
        })
    }

    render() {
        const cStyle = getContainerStyle(this.state.hover);
        const mStyle = getMarkerStyle(this.state.hover, this.props.$getDimensions(this.props.markerId));
        
        return (
            <div style={cStyle} className="marker-container">
                <FadeAndSlideUp in={this.state.hover}>
                    <div className="col-12 row">
                        <p className="marker-info-title">{this.state.station.station_name}</p>
                    </div>
                    <p className="marker-info-text">temperature: {this.props.station.temperature} &deg;F</p>
                    <p className="marker-info-text">pressure: {this.props.station.pressure} hPa</p>
                    <p className="marker-info-text">humidity: {this.props.station.humidity}%</p>
                </FadeAndSlideUp>
                <i style={mStyle} className="fa fa-map-marker marker-icon" aria-hidden="true"></i>
            </div>
        ); 
    }

}

export default Marker;