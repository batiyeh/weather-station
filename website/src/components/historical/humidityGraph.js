import React, { Component } from 'react';
import { Alert } from 'reactstrap';
import '../../styles/historical.css';
import { Line, Chart} from 'react-chartjs-2';
var moment = require('moment');
moment().format();

var colorsGraph = ['#4bc0c0', '#c0864b', '#c04b4b','#c04b86', '#4b86c0', '#c0c04b', '#4bc086', '#327c0c'];
var colorIndex = 0;

class HumidityGraph extends Component{
    constructor(props) {
        super(props);
        this.state = {
            // set the state to be the props that were passed to it by historical container
            data: this.props.data,
            stations: this.props.stations,
            height: this.props.height,
            from: this.props.from,
            to: this.props.to,
            width: this.props.width,
            datasets: {"labels": [], "datasets": []},     // a dictionary of datasets to be drawn on the graph
        }
    }

    componentWillReceieveProps(nextProps){
        console.log(nextProps);
    }

    componentDidMount(){
        var data;
        var stations = this.state.stations;
        for (var station_name in this.state.data) {
            data = this.state.data[station_name];
            //this.createLines(station_name, data["sensorData"], data["dates"]);
            if(stations.includes(station_name)){
                //create the lines for each station based on its data that has been passec
                this.createLines(station_name, data["sensorData"], data["dates"])
            }
        }
        //pass the to and from dates to generate the x axis labels of our graph
        var labels = this.generateLabels(this.state.from, this.state.to, data["dates"]);
        //once generated update them
        this.updateLabels(labels);
    }
    componentWillUnmount(){
        colorIndex =0;
    }


    //generating the label for the x axis based on the to and from date passed from historical container
    generateLabels(from, to, dates){
        var labels = [];
        from = moment(from);
        to = moment(to);
        labels.push(to.format('YYYY-MM-DD HH:mm:ss'));
        for (var i = 0; i < dates.length; i++){
            var m = moment(dates[i]);
            labels.push(m.format('YYYY-MM-DD HH:mm:ss'));
        }
        //labels.push(from.format('YYYY-MM-DD HH:mm:ss'));

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
        if (colorIndex == 7){
            colorIndex = 0
        }
        else
            colorIndex++;
    }

    render(){
        if (this.state.datasets["datasets"].length > 0){
            //console.log(this.state.datasets);
            return(
                <div className='graph'>
                    <Line
                        data={this.state.datasets}
                        width={this.state.width}
                        height={this.state.height}
                        options={{maintainAspectRatio: false,
                            scales: {
                                xAxes: [{
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Time',
                                        fontFamily: 'Roboto Mono',
                                        fontColor: '#000',
                                        fontSize: 15
                                    },
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
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Humidity',
                                        fontFamily: 'Roboto Mono',
                                        fontColor: '#000',
                                        fontSize: 15
                                    },
                                    type: 'linear',
                                    ticks: {
                                        fontColor: '#000',
                                        fontFamily: 'Roboto Mono',
                                        fontSize: 15,
                                        callback: function(value, index, values) {
                                            return value + '%';
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
            return(
                <div className='col-12 no-data-alert'>
                    <Alert color="primary">There is no weather data for this filter.</Alert>
                </div>
            );
        }
    }
}
export default HumidityGraph;