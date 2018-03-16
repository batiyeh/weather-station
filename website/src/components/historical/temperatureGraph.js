import React, { Component } from 'react';
import '../../styles/historical.css';
import { Line, Chart} from 'react-chartjs-2';
// import moment so we can get better time labels

class TemperatureGraph extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            height: this.props.height,
            selectX: this.props.selectX,
            selectY: this.props.selectY,
            width: this.props.width,
            lines: [],
            labels: []
        }
    }

    componentWillMount(){
        var temperature = [];
        var labels = [];
        var Data = [];
        for (var apiKey in this.state.data) {
            Data = this.state.data[apiKey];
            for(var i = 0; i < Data.length; i++) {
                temperature.push(Data[i]);

                    i++;
                    labels.push(Data[i]);
                }
            this.setState({
                selectX: temperature,
                selectY: labels,
            });
            console.log(this.state.selectX);
            this.createLines();
        }

    }
    createLines() {

        const newDataset = {
                label: 'Temperature Data',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderDash: [8, 4],
                borderWidth: 2,
                borderJoinStyle: 'miter',
                pointRadius: 4,
                pointHitRadius: 10,
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 3,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                data: this.state.selectX, // Array of just temp data
            };
        console.log(this.state.selectX);
        this.state.labels.push(this.state.selectY);// Time labels
        this.state.lines.push(newDataset);
    }



    render(){
        const lines = {
            datasets: this.state.lines
        };
        console.log(lines);
        console.log(this.state.datasets);
        return(
            <div className='graph'>
                <Line
                    data={lines}
                    width={this.state.width}
                    height={this.state.height}
                    options={{maintainAspectRatio: false,
                        scales: {
                            xAxes: [{
                                type: 'time',
                                gridLines: {
                                    drawBorder: true,
                                },
                                ticks: {
                                    fontColor: '#000',
                                    fontFamily: 'Roboto Mono',
                                    fontSize: 15
                                },
                                time: {
                                    displayFormats: {
                                        quarter: 'MMM D YYYY'    /*Displays month day year*/
                                    }
                                },
                            }],
                            yAxes: [{
                                type: 'linear',
                                ticks: {
                                    fontColor: '#000',
                                    fontFamily: 'Roboto Mono',
                                    fontSize: 15,
                                    callback: function(value, index, values) {
                                        return value + '°';
                                    }
                                },
                                gridLines: {
                                    borderDash: [2,1],
                                    drawBorder: false
                                }
                            }],
                        },
                    }}
                />
            </div>
        );
    }
}
export default TemperatureGraph;