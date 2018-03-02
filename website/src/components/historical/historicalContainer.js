import React, { Component } from 'react';
import '../../styles/historical.css';
import TemperatureGraph from './temperatureGraph'


class HistoricalContainer extends Component{
    constructor(props){
        super(props);
        
    }

    render(){
        var data = [
            { "day": "2017-04-18", "productPerceivedQuality": "2.8" },
            { "day": "2017-04-19", "productPerceivedQuality": "2.9" },
            { "day": "2017-04-20", "productPerceivedQuality": "2.7" },
            { "day": "2017-04-21", "productPerceivedQuality": "4.3" },
            { "day": "2017-04-22", "productPerceivedQuality": "4.6" },
            { "day": "2017-04-23", "productPerceivedQuality": "5" },
            { "day": "2017-04-24", "productPerceivedQuality": "5.2" },
            { "day": "2017-04-25", "productPerceivedQuality": "5.1" },
            { "day": "2017-04-26", "productPerceivedQuality": "4.8" },
            { "day": "2017-04-27", "productPerceivedQuality": "4.9" },
            { "day": "2017-04-28", "productPerceivedQuality": "5.1" },
            { "day": "2017-04-29", "productPerceivedQuality": "5.3" },
            { "day": "2017-04-30", "productPerceivedQuality": "5.6" },
            { "day": "2017-05-01", "productPerceivedQuality": "6.2" }
        ]

        return(
            <TemperatureGraph className="graph"
                data={data}
                height={300}
                selectX={datum => new Date(datum.day)}
                selectY={datum => datum.productPerceivedQuality}
                width={500}
            />
        );
    }
}
export default HistoricalContainer;