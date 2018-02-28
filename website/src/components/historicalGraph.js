import React, { Component } from 'react';
//import '../../styles/historical.css';
import * as d3 from 'd3'


class historicalGraph extends Component{
    constructor(props){
        super(props);
        this.createGraph = this.createGraph.bind(this)
    }

    componentDidMount(){
        this.createGraph()
    }

    componentDidUpdate(){
        this.createGraph()
    }

    createGraph(){
        var xScale = d3.scaleTime()
            .domain([new Date(1910,0,1), (new Date(2010, 0, 1))])
            .range([0,500]);
        var yScale = d3.scaleLinear()
            .domain([0, 10000])
            .range([250,0]);
        var xAxis = d3.axisBottom(xScale);
        var yAxis = d3.axisLeft(yScale);
        yAxis.tickSizeInner(5);
        yAxis.tickSizeOuter(10);
        xAxis.tickSize(5);
        xAxis.tickFormat(d3.timeFormat('%Y'));
        yAxis.tickFormat(d3.format(',f'));
        yAxis.tickValues([0, 75, 150, 1000, 2500, 5000]);
    }

    render(){
        return(
            <div>
                <svg ref={this.createGraph()} width={500} height={500}></svg>
            </div>
        );
    }
}
export default historicalGraph;