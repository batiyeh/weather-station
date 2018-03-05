import React, { Component } from 'react';
import '../../styles/historical.css';
import { extent as d3ArrayExtent } from 'd3-array';
import {
  scaleLinear as d3ScaleLinear,
  scaleTime as d3ScaleTime,
} from 'd3-scale';
import {
    axisLeft as d3AxisLeft, axisBottom as d3AxisBottom } from 'd3-axis';
import { line as d3Line } from 'd3-shape';
import { select as d3Select } from 'd3-selection';
import { timeFormat as d3timeFormat,
        timeParse as d3timeParse} from 'd3-time-format'



class TemperatureGraph extends Component{
    constructor(props){
        super(props);
        console.log(props);
        this.state = {
            data: [],
            height: this.props.height,
            selectX: this.props.selectX,
            selectY: this.props.selectY,
            width: this.props.width,
            margin: {top: 20, right: 20, bottom: 30, left: 50},
        }
        console.log(this.state.data);
    }
    componentWillMount(){
        this.getTemp();
    }
    getTemp = async () => {
        var tempData;
        const response = await fetch('/api/weather/temp/');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        if (body.temp) tempData = body.temp;
        this.setState({data: tempData});
    };



    render(){
        console.log(this.state.data);
        //var parseDate = d3timeFormat("%Y-%m-%d %H:%M:%S").parse;
        var dayExtent = d3ArrayExtent(this.state.data, function(d) {return d3timeFormat(d.created_at).parse});
        console.log(dayExtent);
        const xScale = d3ScaleTime()
            //.domain(0, dayExtent)
            .range([0, 1000]);

        // Our y axis should just have a linear scale.
        // Our y domain will be the extent of y values (numbers) in our data set.
        const yScale = d3ScaleLinear()
            .domain([0,100])
            .range([this.state.height, 0]);

        // These two functions select the scaled x and y values (respectively) of our data.

        //creating the x axis using xscale
        const xAxis = d3AxisBottom()
            .scale(xScale)
            .tickFormat(d3timeFormat("%H:%M"))
            .ticks(24);

        //creating the y axis using yscale
        const yAxis = d3AxisLeft()
            .scale(yScale)
            .ticks(5);
        // Create a d3Line factory for our scales.
        const tempLine = d3Line()
            .x(function (d){return (d.created_at)})
            .y(function (d){return (d.temperature)});

        //Set the svg for the graph to be rendered
        const graph = d3Select("svg")
            .append("g").attr("transform", "translate(35,50)");
        graph.call(yAxis);
        graph.append("g")
            .attr("transform", "translate(0,"+this.state.height+")")
            .call(xAxis);
        graph.append("text")
        graph.append("path")
            .attr("d", tempLine(this.state.data))
            .attr("stroke", 'black')
            .attr("fill", 'none');

        return(
            <svg ref={node => this.node = node}
                 width={1000} height={500} display="center" >
            </svg>
        );
    }
}
export default TemperatureGraph;