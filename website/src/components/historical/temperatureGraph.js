import React, { Component } from 'react';
import '../../styles/historical.css';
import { LineChart, Line, CartesianGrid, XAxis, YAxis} from 'recharts';




class TemperatureGraph extends Component{
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

    render(){
        return(
            <div className='graph'>
                <LineChart width={this.state.width} height={this.state.height} data={this.state.data}>
                    <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
                    <XAxis dataKey={this.state.selectX}/>
                    <YAxis dataKey="temperature"/>
                </LineChart>
            </div>
        );
    }
}
export default TemperatureGraph;