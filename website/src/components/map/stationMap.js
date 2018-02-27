import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import '../../styles/map.css';


/*
export class MapContainer extends React.Component {
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.google !== this.props.google) {
            this.loadMap();
        }
    }


    loadMap() {
        if(this.props && this.props.google){
            const{google} = this.props;
            const maps = google.maps;
            const mapRef = this.refs.map;
            const node = ReactDOM.findDOMNcode(mapRef);

            let zoom = 14;
            let lat = 42.35648;
            let long = -83.06937;
            const center = new maps.LatLng(lat,long);
            const mapConfig = Object.assign({},{
                center: center,
                zoom: zoom
            })
            this.map = new maps.Map(node, mapConfig)
        }
    }

    render() {
        return(
            <div ref='MapContainer'>
                loading map...
            </div>
        )
    }
}
*/


export class MapContainer extends React.Component{

        render() {
            pos = {lat:42.35648, lng:-83.06937}
            setPosition(latlng: weatherstation.latitude|weatherstation.longitude)
           return (
                        <div className={"google-maps"}>
                                <Map google={this.props.google} zoom={3}>
                                        <Marker onClick = {this.onMarkerClick}/>
                                        <Marker position={pos} />
                                        <InfoWindow onClose = {this.oninfoWindowClose}></InfoWindow>
                                </Map>
                        </div>
                );
        }
}

    export default GoogleApiWrapper({
        apiKey: ('AIzaSyAzZjgldMQ9B4fp0NzKVrzECYzs8uwY78Q')
}) (MapContainer)