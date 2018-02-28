import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import '../../styles/map.css';

{/*import ReactDOM from 'react-dom'; */}

/*
export class MapContainer extends React.Component {
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.google !== this.props.google) {
            this.loadMap();`
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


export class MapContainer extends Component{

    constructor() {
        super();
        this.state = {
            stations: [],
        };
    }
    componentDidMount() {
        this.getStations().then(stations => {
            this.setState({ stations: stations });
        });
        this.interval = setInterval(this.updateStations, 3000);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    updateStations = async () => {
        this.getStations().then(stations => {
            this.setState({
                stations: stations,
                secondsElapsed: this.state.secondsElapsed + 3
            });
        });
    }
    getStations = async () => {
        var stations = [];
        const response = await fetch('/api/stations');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        if (body.stations) stations = body.stations;
    }



    render() {
           /* pos = {lat:42.35648, lng:-83.06937} */

           return (
                        <div className={"google-maps"}>
                                <Map google={this.props.google} zoom={3}>
                                        <Marker onClick = {this.onMarkerClick}/>
                                        <InfoWindow onClose = {this.oninfoWindowClose}></InfoWindow>
                                </Map>
                            <Marker
                            {this.state.stations
                                .map(station => {
                                    return (
                                        <div>{station.longitude}{station.latitude}</div>
                                        // call another card which grabs the rows of the longitude and latitude

                                    );
                                })
                            } />
                        </div>
                );
        }
}

    export default GoogleApiWrapper({
        apiKey: ('AIzaSyAzZjgldMQ9B4fp0NzKVrzECYzs8uwY78Q')
}) (MapContainer)