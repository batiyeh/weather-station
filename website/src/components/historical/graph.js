import React, { Component } from 'react';
import { Alert } from 'reactstrap';
import '../../styles/historical.css';
import { Line, Scatter } from 'react-chartjs-2';



var colorsGraph = ['#4bc0c0', '#c0864b', '#4b86c0', '#c04b4b', '#c0c04b', '#4bc086', '#c04b86', '#327c0c'];  // Array of colors to be choosen when drawing multiple lines on the graph
var colorIndex = 0;   //variable to keep track of what index is currently selected in the graph

class Graph extends Component{
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
            sensorType: this.props.sensorType,
            datasets: {"datasets": []}, // a dictionary of datasets to be drawn on the graph
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.state.stationsData !== this.state.data){
            this.setState({
                station: nextProps.state.stationsData
            })
        }
        if(nextProps.state.toBeDrawn !== this.state.stations){
            this.setState({
                station: nextProps.state.toBeDrawn
            })
        }
        if(nextProps.state.fromDate !== this.state.from){
            this.setState({
                station: nextProps.state.fromDate
            })
        }
        if(nextProps.state.toDate !== this.state.to){
            this.setState({
                station: nextProps.state.toDate
            })
        }
        if(nextProps.state.sensorType !== this.state.sensorType){
            this.setState({
                station: nextProps.state.sensorType
            })
        }
    }

    componentDidMount(){
        var data;
        var stations = this.state.stations;
        for (var station_name in this.state.data) {
            data = this.state.data[station_name];
            //this.createLines(station_name, data["sensorData"], data["dates"]);
            if(stations.includes(station_name)){
                //create the lines for each station based on its data that has been passec
                this.createLine(station_name, data["points"])
            }
        }
    }
    componentWillUnmount() {
        // reset the color index upon the page being unloaded
        colorIndex = 0;
    }

    //function for creating the line on the graph based on station data
    createLine(name, data) {
        var datasets = this.state.datasets;     //creating a variable of datasets based on what it currently is because it will be added on too
        const newDataset = {            //creating the new dataset for the line and setting the styling
                label: name,
                fill: false,
                lineTension: 0.1,
                backgroundColor: colorsGraph[colorIndex],       //creating the color of the line based on the current position of the color array
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
                data: data,                                 //storing the actual data to be plotted for the line
        };
        datasets["datasets"].push(newDataset);      // push the new dataset in to the array of datasets to be drawn
        this.setState({
            datasets: datasets                      // set the state with the new dataset that has been added to it
        });
        if (colorIndex === colorsGraph.length - 1) colorIndex = 0
        else colorIndex++;  //other wise move the index to the next position
    }

    render(){
        //render each dataset that has been made below sets the styling of the overall graph and chart not the lines
        if (this.state.sensorType === 'temperature'){
            if (this.state.datasets["datasets"].length > 0){
                return(
                    <div className='graph'>
                        <Scatter
                            data={this.state.datasets}      //load in the datasets aka lines to be drawn
                            width={this.state.width}        // set the width and the height
                            height={this.state.height}
                            // spanGaps={{}}
                            options={{
                                maintainAspectRatio: false,    //options setup the styling for the graph setting the x and y axis
                                showLines: true,
                                scales: {
                                    xAxes: [{
                                        stacked: false,
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
                                    }],
                                    yAxes: [{
                                        scaleLabel: {
                                            display: true,
                                            labelString: 'Temperature',
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
                                                return value + '°';     // add the degree symbol to the points on the y axis
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
            else{ //if there is nothing loaded in to data sets thats because no data was returned so no weather data
                return(
                    <div className='col-12 no-data-alert'>
                        <Alert color="primary">There is no weather data for this filter.</Alert>
                    </div>
                );
            }

        }
        else if(this.state.sensorType === 'pressure'){
            if (this.state.datasets["datasets"].length > 0){
                //console.log(this.state.datasets);
                return(
                    <div className='graph'>
                        <Line
                            data={this.state.datasets}
                            width={this.state.width}
                            height={this.state.height}
                            options={{
                                maintainAspectRatio: false,
                                showLines: true,
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
                                                quarter: 'MM D YYYY'    /*Displays month day year*/
                                            }
                                        },
                                    }],
                                    yAxes: [{
                                        scaleLabel: {
                                            display: true,
                                            labelString: 'Pressure',
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
                                                return value + 'hPa';
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
        else if(this.state.sensorType === 'humidity'){
            if (this.state.datasets["datasets"].length > 0){
                return(
                    <div className='graph'>
                        <Scatter
                            data={this.state.datasets}
                            width={this.state.width}
                            height={this.state.height}
                            options={{
                                maintainAspectRatio: false,
                                showLines: true,
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
}
export default Graph;