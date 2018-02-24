import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import '../../styles/map.css';

export class MapContainer extends Component{
        render() {
                return (
                        <div className="google-map">
                                <Map google={this.props.google} zoom={8}>
                                        <Marker onClick = {this.onMarkerClick}
                                        name={'Current Location'} />
                                        <InfoWindow onClose = {this.oninfoWindowClose}></InfoWindow>
                                </Map>
                        </div>
                );
        }
}

    export default GoogleApiWrapper({
        apiKey: ('AIzaSyAzZjgldMQ9B4fp0NzKVrzECYzs8uwY78Q')
}) (MapContainer)