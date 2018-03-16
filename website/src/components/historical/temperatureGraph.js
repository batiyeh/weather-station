import React, { Component } from 'react';
import '../../styles/historical.css';
import { Line, Chart} from 'react-chartjs-2';
var moment = require('moment');
moment().format();

var colorsGraph = ['#4bc0c0', '#c0864b', '#c04b4b','#c04b86', '#4b86c0'];
var colorIndex = 0;

class TemperatureGraph extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            height: this.props.height,
            from: "2018-03-15 00:00:00",
            to: "2018-03-15 23:59:00",
            width: this.props.width,
            datasets: {"labels": [], "datasets": []},
        }
    }

    componentDidMount(){
        var data;
        var labels = this.generateLabels(this.state.from, this.state.to);
        this.updateLabels(labels);
        for (var station_name in this.state.data) {
            data = this.state.data[station_name];
            this.createLines(station_name, data["temp"], data["dates"]);
        }
    }

    generateLabels(from, to){
        var labels = [];
        from = moment(from);
        to = moment(to);
        for (var m = moment(from); m.isBefore(to); m.add(15, 'minutes')) {
            labels.push(m.format('YYYY-MM-DD HH:MM:SS'));
        }
        
        return labels;
    }

    updateLabels(labels){
        var currDatasets = this.state.datasets;
        currDatasets["labels"] = labels;
        this.setState({
            datasets: currDatasets
        });
    }

    createLines(name, temp, dates) {
        var datasets = this.state.datasets;
        const newDataset = {
                label: name,
                fill: false,
                lineTension: 0.1,
                backgroundColor: colorsGraph[colorIndex],
                borderColor: colorsGraph[colorIndex],
                borderDash: [8, 4],
                borderWidth: 2,
                borderJoinStyle: 'miter',
                pointRadius: 4,
                pointHitRadius: 10,
                pointBorderColor: colorsGraph[colorIndex],
                pointBackgroundColor: '#fff',
                pointBorderWidth: 3,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: colorsGraph[colorIndex],
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                data: temp,
        };
        datasets["datasets"].push(newDataset);
        this.setState({
            datasets: datasets
        });
        colorIndex++;
    }

    render(){
        if (this.state.datasets["datasets"].length > 0){
            console.log(this.state.datasets);
            return(
                <div className='graph'>
                    <Line
                        data={this.state.datasets}
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

        else{
            return null;
        }
    }
}
export default TemperatureGraph;