import React, { Component } from 'react';
import {Map,InfoWindow,Marker,GoogleApiWrapper} from 'google-maps-react';
import '../styles/map.css';

    export class MapContainer extends React.Component{
    render() {
                return (
                        <Map google={this.props.google} zoom={8}>
                            <Marker onClick = {this.onMarkerClick}
                                    name={'Current Location'} />
                  <InfoWindow onClose = {this.oninfoWindowClose}>
                          <div>
                              <h1>{this.stat.selectedPlace.name}</h1>
                          </div>
                                  </InfoWindow>
                          </Map>
                );
            }
}

    export default GoogleApiWrapper({
        apiKey: ('AIzaSyAzZjgldMQ9B4fp0NzKVrzECYzs8uwY78Q')
}) (MapContainer)