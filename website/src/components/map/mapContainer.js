import React, { Component, PureComponent } from 'react';
import GoogleMap from 'google-map-react';
import Marker from './marker';
import { MARKER_SIZE } from './markerStyles'
import '../../styles/map.css';

export class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stations: this.props.checkedStations,
            center: [42.362968, -83.072342],
            zoom: 15,
            hoverKey: null,
            clickKey: null
        };
    }

    // Update our list of checked stations on prop change
    componentWillReceiveProps(nextProps) {
        this.setState({
            stations: nextProps.checkedStations
        });
    }

    // Sets the center and zoom state when the user moves the Google Map around
    _onBoundsChange = (center, zoom, bounds, ...other) => {
        this.setState({
            center: center,
            zoom: zoom
        });
    }

    // Fired when clicking a marker, does nothing for now
    _onChildClick = (key, childProps) => {
        // this.props.onCenterChange([childProps.lat, childProps.lng]);
    }

    // Occurs when the mouse pointer enters into the bounds of a marker
    _onChildMouseEnter = (key /*, childProps */) => {
        this.setState({
            hoverKey: key
        });
    }
    
    // Occurs when the mouse pointer leaves into the bounds of a marker
    _onChildMouseLeave = (/* key, childProps */) => {
        this.setState({
            hoverKey: null
        });
    }

    render() {
        const style = {
            width: '100%',
            height: '100%',
            
        }

        return (
            <div className="map">
                <GoogleMap
                        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_KEY }} // set if you need stats etc ...
                        center={this.state.center}
                        zoom={this.state.zoom}
                        hoverDistance={MARKER_SIZE - 10}
                        onBoundsChange={this._onBoundsChange}
                        onChildClick={this._onChildClick}
                        onChildMouseEnter={this._onChildMouseEnter}
                        onChildMouseLeave={this._onChildMouseLeave}
                        style={style}>
                        {this.state.stations
                            .map((station, index) => {
                                if (station.latitude !== "n/a" && station.longitude !== "n/a")
                                return (
                                        <Marker
                                            key={index}
                                            markerId={index}
                                            lat={station.latitude}
                                            lng={station.longitude}
                                            station={station}
                                            hover={this.state.hoverKey === index}
                                        />
                                );
                            })
                        }
                </GoogleMap>
            </div>
        ); 
    }

}
export default MapContainer