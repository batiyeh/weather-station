import React, { Component } from 'react';
import { FormGroup, Input} from 'reactstrap';
import '../../styles/map.css';

class StationSidebar extends Component {
    constructor(){
        super();
        this.state = {
            stations: [],
            filter: ''
        }
    }


    componentWillMount(){
        this.setState({stations: [
                {
                    id: 1,
                    title: "Title",
                }
            ]});
    }
    filterOnChange(e){
        this.setState({
            filter: e.target.value
        })
    }

    filterStations(stations){
        if (this.state.filter !== '')
            return stations.station_name.toLowerCase().includes(this.state.filter.toLowerCase());

        return true;
    }


    render() {
    return(
        <div class = "left"> Station Name
            <FormGroup>
                <Input type="text" className="filterWidth" name="stationFilter" id="stationFilter" placeholder="Station Filter" onChange={this.filterOnChange.bind(this)} />
            </FormGroup>

        </div>

    )}
}

    // render() {
    //     return(
    //         <div class="left">
    //
    //         <div className="container">
    //             <FormGroup>
    //                 <Input type="text" className="filterWidth" name="stationFilter" id="stationFilter" placeholder="Station Filter" onChange={this.filterOnChange.bind(this)} />
    //             </FormGroup>
    //             {/*{this.state.stations*/}
    //             {/*.map(stations => {*/}
    //                 {/*key = {stations.key} station={station}*/}
    //             {/*)}};*/}
    //
    //         </div>

export default StationSidebar;
