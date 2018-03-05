import React, { Component } from 'react';
import '../../styles/historical.css';
import TemperatureGraph from './temperatureGraph'



class HistoricalContainer extends Component{
    constructor(props){
        super(props);
        this.state = {
        }
        
    }

    render(){
        var data;
        var x;
        var y;
        //this.getTemp().then(data =>{
           // this.setState({ data: data });
            //console.log(this.state.data);
        //});
        return(

            <TemperatureGraph className="graph"
                //data={}
                height={400}
                //selectX={datum => datum.created_at}
                //selectY={datum => datum.temperature}
                width={500}
                />

        );
    }
}
export default HistoricalContainer;