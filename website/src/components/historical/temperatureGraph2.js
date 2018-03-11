import React, { Component } from 'react';
import '../../styles/historical.css';
import { LineChart, Line, CartesianGrid, XAxis, YAxis} from 'recharts';
import Dygraph from 'dygraphs';



class TemperatureGraph2 extends Component{

    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            height: this.props.height,
            selectX: this.props.selectX,
            selectY: this.props.selectY,
            width: this.props.width,
            margin: {top: 20, right: 20, bottom: 30, left: 50},
        }
    }
    componentDidMount(){
        new Dygraph('graphdiv', this.state.data, {labels: ["temperature", "created_at"]});
    }
    render(){
        return(
            null
        )
    }

}
export default TemperatureGraph2;