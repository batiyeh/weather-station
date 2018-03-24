import React, { Component } from 'react';
import { Alert } from 'reactstrap';
import '../../styles/historical.css';
import { Line, Chart} from 'react-chartjs-2';
var moment = require('moment');
moment().format();

var colorsGraph = ['#4bc0c0', '#c0864b', '#c04b4b','#c04b86', '#4b86c0', '#c0c04b', '#4bc086', '#327c0c'];  // Array of colors to be choosen when drawing multiple lines on the graph
var colorIndex = 0;   //variable to keep track of what index is currently selected in the graph

class TemperatureGraph extends Component{
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
        for (var station_name in this.state.data) {
            data = this.state.data[station_name];
            console.log(this.state.stations);
            if(this.state.stations.contains(toString(station_name))){
                //create the lines for each station based on its data that has been passec
                this.createLines(station_name, data["sensorData"], data["dates"]);
            }
        }
        //pass the to and from dates to generate the x axis labels of our graph
        //var labels = this.generateLabels(this.state.from, this.state.to, data["dates"]);
        //once generated update them
        //this.updateLabels(labels);
        console.log(data);
    }
    componentWillUnmount(){
        // reset the color index upon the page being unloaded
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
        var currDatasets = this.state.datasets;     //updating the labels for the current dataset
        currDatasets["labels"] = labels;
        this.setState({
            datasets: currDatasets
        });
    }

    //function for creating the line on the graph based on station data
    createLines(name, temp, dates) {
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
                data: temp,                                 //storing the actual data to be plotted for the line
        };
        datasets["datasets"].push(newDataset);      // push the new dataset in to the array of datasets to be drawn
        this.setState({
            datasets: datasets                      // set the state with the new dataset that has been added to it
        });
        if (colorIndex == 7){           //reset the color array index if reached the end of it
            colorIndex = 0
        }
        else
            colorIndex++;               //other wise move the index to the next position
    }

    render(){
        if (this.state.datasets["datasets"].length > 0){    //render each dataset that has been made below sets the styling of the overall graph and chart not the lines
            //console.log(this.state.datasets);
            return(
                <div className='graph'>
                    <Line
                        data={this.state.datasets}      //load in the datasets aka lines to be drawn
                        width={this.state.width}        // set the width and the height
                        height={this.state.height}
                        options={{maintainAspectRatio: false,    //options setup the styling for the graph setting the x and y axis
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

        else{                     //if there is nothing loaded in to data sets thats because no data was returned so no weather data
            return(
                <div className='col-12 no-data-alert'>
                    <Alert color="primary">There is no weather data for this filter.</Alert>
                </div>
            );
        }
    }
}
export default TemperatureGraph;