import React, { Component } from 'react';
import '../../styles/historical.css';
import { Line } from 'react-chartjs-2';
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
        }
    }

    componentWillMount(){
        var temperature = [];
        var labels = [];
        for (var i = 0; i < this.props.data.length; i++){
            // Should grab a point every 2.5 minutes (50*3 / 60). We may want to
            // Change this dynamically based on the range of times we get.
            // IE: if our date range is over a day set to every 15 minutes etc.
            if (i % 50 == 0){


                // form [72.6, 71.8, 80.0] etc.
                temperature.push(this.props.data[i].temperature);

                // Create a formatted time string for each point here so it looks better
                // Push to times array which is set in our state as labels
                labels.push(this.props.data[i].created_at);
            }
        }
        this.setState({
            selectX: temperature,
            selectY: labels

        });
    }

    render(){
        const data = {
            labels: this.state.selectY, // Time labels

            // This is an array of dataset objects. It currently only has one object hence the one line
            // To add more lines, just add more to the list with more data from the state
            // So you'll end up preprocessing all your data and adding a new dataset element to this array
            // For each line you want. You'll also notice all the styles for the individual line are in here too.
            datasets: [{
                label: 'Temperature Data',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: this.state.selectX // Array of just temp data
            }]

        };
        
        return(
            <div className='graph'>
                <Line
                    data={data}
                    width={this.state.width}
                    height={this.state.height}
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
                />
            </div>
        );
    }
}
export default TemperatureGraph;