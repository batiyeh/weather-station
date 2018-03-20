import React, { Component } from 'react';
import GoogleMap from 'google-map-react';
import { fitBounds } from 'google-map-react/utils';
import geolib from 'geolib';
import Marker from './marker';
import { MARKER_SIZE } from './markerStyles'
import '../../styles/map.css';

export class MapContainer extends Component {
    constructor(props) {
        super(props);
        const {center, zoom} = this.calculateMapBounds(this.props.checkedStations, this.props.height, this.props.width);

        this.state = {
            stations: this.props.checkedStations,
            center: [center.lat, center.lng],
            zoom: zoom,
            hoverKey: null,
            clickKey: null,
            showLabels: this.props.showLabels,
        };
    }

    // Update our list of checked stations on prop change
    componentWillReceiveProps(nextProps) {
        if (nextProps.checkedStations !== this.state.stations){
            this.setState({
                stations: nextProps.checkedStations
            });
        }

        if (nextProps.showLabels !== this.state.showLabels){
            this.setState({
                showLabels: nextProps.showLabels
            });
        }
    }

    // Calculate the size of the map bounds by lat/lon and 
    // return the center + zoom of the bounds
    calculateMapBounds(stations, height, width){
        var allCoords = [];
        var coords;
        for (var i = 0; i < stations.length; i++){
            coords = {
                latitude: stations[i].latitude, 
                longitude: stations[i].longitude
            };
            allCoords.push(coords);
        }

        var bounds = geolib.getBounds(allCoords);
        bounds = {
            nw: {
                lat: bounds.maxLat,
                lng: bounds.minLng
            },
            se: {
                lat: bounds.minLat,
                lng: bounds.maxLng
            }
        }
        
        const {center, zoom} = fitBounds(bounds, {height: height, width: width});
        return {center, zoom}; 
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
            <div id="map" className="map">
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
                                            key={station.apikey}
                                            markerId={index}
                                            lat={station.latitude}
                                            lng={station.longitude}
                                            station={station}
                                            hover={this.state.hoverKey === station.apikey}
                                            label={this.state.showLabels}
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