import React, { Component } from 'react';
import '../../styles/historical.css';
import { LineChart, Line, CartesianGrid} from 'recharts';
//import { extent as d3ArrayExtent } from 'd3-array';
//import {
  //scaleLinear as d3ScaleLinear,
  //scaleTime as d3ScaleTime,
//} from 'd3-scale';
//import {
    //axisLeft as d3AxisLeft, axisBottom as d3AxisBottom } from 'd3-axis';
//import { line as d3Line } from 'd3-shape';
//import { select as d3Select } from 'd3-selection';
//import { timeFormat as d3timeFormat,
        //timeParse as d3timeParse} from 'd3-time-format'



class TemperatureGraph extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            height: this.props.height,
            selectX: this.props.selectX,
            selectY: this.props.selectY,
            width: this.props.width,
            margin: {top: 20, right: 20, bottom: 30, left: 50},
        }
    }




    

    render(){
        return(
            <div id='graph'>
                <LineChart width={this.state.width} height={this.state.height} data={this.state.data}>
                    <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                    <CartesianGrid stroke="#ccc" />
                </LineChart>
            </div>
        );
    }
}
export default TemperatureGraph;