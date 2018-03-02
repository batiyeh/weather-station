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



class TemperatureGraph extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: this.props.data,
            height: this.props.height,
            selectX: this.props.selectX,
            selectY: this.props.selectY,
            width: this.props.width,
            margin: this.props.margin,
        }
    }

    render(){
        const xScale = d3ScaleTime()
        .domain(d3ArrayExtent(this.state.data, this.state.selectX))
        .range([0, this.state.width]);

        // Our y axis should just have a linear scale.
        // Our y domain will be the extent of y values (numbers) in our data set.
        const yScale = d3ScaleLinear()
            .domain(d3ArrayExtent(this.state.data, this.state.selectY))
            .range([this.state.height, 0]);

        // These two functions select the scaled x and y values (respectively) of our data.
        const selectScaledX = datum => xScale(this.state.selectX(datum));
        const selectScaledY = datum => yScale(this.state.selectY(datum));
        //creating the x axis using xscale
        const xAxis = d3AxisBottom()
            .scale(xScale)
            .ticks(this.state.data.length /2 )

        //creating the y axis using yscale
        const yAxis = d3AxisLeft()
            .scale(yScale)
            .ticks(3);
        // Create a d3Line factory for our scales.
        const sparkLine = d3Line()
            .x(selectScaledX)
            .y(selectScaledY);

            // Create a line path of for our data.
        const linePath = sparkLine(this.state.data);

        const graph = d3Select("svg")
            .attr("border", 1).style("stroke", 'blue')
            .append("g").attr("transform", "translate(25,300)");
        graph.call(yAxis);
        graph.append("g")
            .attr("transform", "translate(0,300)")
            .call(xAxis);

        return(
            <svg ref={node => this.node = node}
                 width={1000} height={1000} >
                <g>
                    <path d={linePath} />
                </g>
            </svg>
        );
    }
}
export default TemperatureGraph;