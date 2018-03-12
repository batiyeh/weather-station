import React, { Component } from 'react';
import '../../styles/historical.css';
import { Line } from 'react-chartjs-2';




class TemperatureGraph3 extends Component{
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
        console.log(this.state.selectX);
        console.log(this.state.selectY);
        var tempData = {
            labels: "temperature",
            datasets :[{
                data: [{
                    x: this.state.selectX,
                    y: this.state.selectY
                }]
            }]
        };
        return(
            <div className='graph'>
                < Line
                    data={tempData}
                    options={{maintainAspectRatio: false,
                        scales: {
                            xAxes: [{
                                type: 'time',
                                time: {
                                    displayFormats: {
                                        quarter: 'hA'
                                    }
                                }
                            }]
                        }}}
                    width={this.state.width}
                    height={this.state.height}
                    />
            </div>
        );
    }
}
export default TemperatureGraph3;