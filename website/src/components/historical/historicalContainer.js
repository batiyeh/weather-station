import React, { Component } from 'react';
import '../../styles/historical.css';
import TemperatureGraph from './temperatureGraph'
//import * as d3 from 'd3';


class HistoricalContainer extends Component{
    constructor(props){
        super(props);
        
    }
    getTemp = async () => {
        var data = [];
        const response = await fetch('/api/weather/temp/');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        if (body.temp) data = body.temp;
        console.log(data);
        return data;
    };

    render(){
        var data = this.getTemp();
        return(
            <TemperatureGraph className="graph"
                data={data}
                height={300}
                selectX={datum => new Date(datum.day)}
                selectY={datum => datum.temperature}
                width={500}
            />
        );
    }
}
export default HistoricalContainer;