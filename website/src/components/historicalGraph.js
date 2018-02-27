import React, { Component } from 'react';
import '../../styles/historical.css';
import { select } from 'd3'


class historicalGraph extends Component{
    constructor(props){
        super(props);
        this.createGraph = this.createGraph.bind(this)
    }

    componentDidMount() {
        this.createGraph()
    }

    componentDidUpdate() {
        this.createGraph()
    }

}