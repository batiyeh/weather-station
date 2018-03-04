import React, { Component } from 'react';
import '../../styles/historical.css';
import TemperatureGraph from './temperatureGraph'


class HistoricalContainer extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: [],
        }
        
    }
    getTemp = async () => {
        var tempData;
        const response = await fetch('/api/weather/temp/');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        if (body.temp) tempData = body.temp;

        return tempData;
    };

    render(){
        var data;
        this.getTemp().then(data =>{
            data = data;
        })
        return(
            <TemperatureGraph className="graph"
                  data={data}
                  height={300}
                  selectX={datum => datum.created_at}
                  selectY={datum => datum.temperature}
                  width={500}
            />
        );
    }
}
export default HistoricalContainer;