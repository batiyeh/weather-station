import React, { Component } from 'react';
import '../../styles/historical.css';
import * as d3 from 'd3'
import { extent as d3ArrayExtent } from 'd3-array';
import {
  scaleLinear as d3ScaleLinear,
  scaleTime as d3ScaleTime,
} from 'd3-scale';
import { line as d3Line } from 'd3-shape';


class TemperatureGraph extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: this.props.data,
            height: this.props.height,
            selectX: this.props.selectX,
            selectY: this.props.selectY,
            width: this.props.width,
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

        // Create a d3Line factory for our scales.
        const sparkLine = d3Line()
            .x(selectScaledX)
            .y(selectScaledY);

            // Create a line path of for our data.
        const linePath = sparkLine(this.state.data);
        return(
            <svg
                className="container"
                height={this.state.height}
                width={this.state.width}
            >
                {/* ADD: our spark line as a path (inside a group, for convenient styling) */}
                <g className="line">
                    <path d={linePath} />
                </g>
            </svg>
        );
    }
}
export default TemperatureGraph;