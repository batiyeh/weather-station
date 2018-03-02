import React from "react";
import { FormGroup, Input} from 'reactstrap';

class stationSidebar extends React.Component {
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
        console.log(stations.name)
        if (this.state.filter !== '' && !_.isNull(stations.name))
            return stations.name.toLowerCase() .includes(this.state.filter.toLocaleLowerCase());
        else if (this.state.filter !== '' && _.isNull(stations.name))
            return stations.mac_address.toLowerCase() .includes(this.state.filter.toLowerCase());
        return true;
    }


    render() {
        return(
            <div className="container">
                <FormGroup>
                    <Input type="text" className="filterWidth" name="stationFilter" id="stationFilter" placeholder="Station Filter" onChange={this.filterOnChange.bind(this)} />
                </FormGroup>
            <u1 className = "sidebar_station_name">
                {this.state.stations
                    .filter(this.filterStations.bind(this)
                    )};
                <stationSidebar stations={this.state.stations} />
            </u1>
            </div>
        );
    }
}

export default stationSidebar;
