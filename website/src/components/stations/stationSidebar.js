import React from "react";
import StationBar from './stationBar';

class stationSidebar extends React.Component {
    constructor(){
        super();
        this.state = {
            stations: []
        }
    }

    componentWillMount(){
        this.setState({stations: [
                {
                    id: 1,
                    title: "Station Name",
                }
            ]});
    }

    render() {
        return(
            <u1 className = "sidebar_station_name">
                <stationSidebar stations={this.state.stations} />
            </u1>
        );
    }
}

export default stationSidebar;
