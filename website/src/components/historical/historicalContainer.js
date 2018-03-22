import React, { Component } from 'react';
import '../../styles/historical.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input } from 'reactstrap';
import TemperatureGraph from './temperatureGraph'
import PressureGraph from './pressureGraph'
import HumidityGraph from './humidityGraph'
import DatePicker  from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
var moment = require('moment');
moment().format();

class HistoricalContainer extends Component{
    //set the props for the container
    constructor(props){
        super(props);
        //set the default range of the graph to be the last 24 hours from whatever time it is.
        var oneday = moment().subtract(1, "days");
        var now = moment();
        this.state = {
            stationsData: {},
            modal: false,
            loading: true,                      //makes the rendering wait til it is done loading all the data
            sensorType: 'temperature',          //default graph is temperature
            fromDate: oneday.format("YYYY-MM-DD HH:mm:ss"),   //the props that set the range for the graph
            toDate: now.format("YYYY-MM-DD HH:mm:ss")
            //fromDate: '2018-03-18 22:35:35',
            //toDate: '2018-03-19 10:00:08'
        }
        this.toggleFilter = this.toggleFilter.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleToChange = this.handleToChange.bind(this);
        this.handleFromChange = this.handleFromChange.bind(this);
        this.updateGraph = this.updateGraph.bind(this);

    }

    //Function that toggles the filter modal on or off based on its current state
    toggleFilter(){
        this.setState({
            modal: !this.state.modal
        })

    }

    //once the component mounts it grabs the sensor data for the graph
    componentDidMount() {
        this.getSensorData()
    }

    //When the to date value is changed in the modal it is handled here
    handleToChange(date) {
        this.setState({
            toDate: date
        });
    }

    //When the from date value is changed in the modal it is handled here
    handleFromChange(date) {
        this.setState({
            fromDate: date
        });
    }

    //When the sensor type is changed in the modal it is handled here
    onSenseChange(value) {
        this.setState({
            sensorType: value
        })
    }

    //async call that is grabbing the sensor data based on current state of the props
    getSensorData = async () => {
        var data;
        var stationsDict = {};
        var toDate = this.state.toDate;
        var fromDate = this.state.fromDate;
        var type = this.state.sensorType;
        const response = await fetch('/api/weather/sensorData/' + fromDate +'/' + toDate + '/'+ type);  //API fetch call to get data based on time and sensor type
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        if (body.temp) data = body.temp;            //storing the response from the fetch call in to variable data
        for (var i = 0; i < data.length; i++) {     // for loop to sort through returned data
            var station_name = data[i].station_name;        //we are storing the data in a dictionary based on station name
            if (!stationsDict[station_name]) stationsDict[station_name] = {"sensorData": [], "dates": []};  // if the station name is not found in the dictionary yet add it with arrays to store data and time
            if (type === 'temperature') {
                stationsDict[station_name]["sensorData"].push(data[i].temperature);             //data is returned in JSON format so based on what sensor type is how we determine to push it into the data array
            }
            else if(type === 'pressure'){
                stationsDict[station_name]["sensorData"].push(data[i].pressure);
            }
            else if(type === 'humidity'){
                stationsDict[station_name]["sensorData"].push(data[i].humidity);
            }
            stationsDict[station_name]["dates"].push(data[i].created_at);               //Time is returned as created_at so for that we push it in to the dates array of the station in the dictionary
        }
        this.setState({
            stationsData: stationsDict,     // end the async function by setting the state so that the stations dictionary is stored in stations data
            loading: false                  // set loading to false so that graph can be rendered
        });
        this.processDataPoints();
    };

    processDataPoints(){
        var data;
        var senseData;
        var date;
        for (var station_name in this.state.stationsData) {
            data = this.state.stationsData[station_name];
            senseData= data["sensorData"];
            date = data["dates"];
            for(var i = 0; i < senseData.length; i++){
                var time = date[i];
                var min = time.slice(14,16);
                var sec = time.slice(17,19);
                console.log(sec);
                i = senseData.length;
            }
        }
    }

    //function upon hitting submit in the modal with new data to update the graph and close the modal
    updateGraph(){
        this.setState({
            loading: true,
            modal: false
        })
        this.getSensorData()        //call the async function to get the data based on the new parameters set by the filter
    }

    //function that handles the rendering of the graph it is done by sensor type
    renderGraph(){
        if(this.state.sensorType === 'temperature') {       // checks which sensor type is currently selected and renders the corresponding component based on that
            return(
                <TemperatureGraph className="row graph"
                    data={this.state.stationsData}          //passes the stations data to the graph component
                    from={this.state.fromDate}              // passes the to and from dates to the graph component
                    to={this.state.toDate}
                    height={500}                            //The height and width of the graph is passed to the graph component
                    width={800}
                />
            )
        }
        else if(this.state.sensorType === 'pressure'){
            return(
                <PressureGraph className="row graph"
                    data={this.state.stationsData}
                    from={this.state.fromDate}
                    to={this.state.toDate}
                    height={500}
                    width={800}
                />
            )
        }
        else if(this.state.sensorType === 'humidity'){
            return(
                <HumidityGraph className="row graph"
                    data={this.state.stationsData}
                    from={this.state.fromDate}
                    to={this.state.toDate}
                    height={500}
                    width={800}
                />
            )
        }
    }



    render(){
        if(this.state.loading === false){   // if the state is no longer loading then it will render the page
            return(
                <div className="historical-container">
                    <Modal isOpen={this.state.modal} toggle={this.toggleFilter}>
                        <ModalHeader toggle={this.toggleFilter}>Filter Historical Graph</ModalHeader>
                        <form id='filterForm'>
                            <ModalBody>
                                <div className='form-group'>
                                    <label>Data Type</label>
                                    <Input type="select" name='senseType' id='senseType' value={this.state.sensorType} onChange={e => this.onSenseChange(e.target.value)}>
                                        <option value='temperature'>Temperature</option>
                                        <option value='humidity'>Humidity</option>
                                        <option value='pressure'>Pressure</option>
                                    </Input>
                                </div>
                                <div className='form-group'>
                                    <div className="row">
                                        <div className="col-6">
                                            <label for="dateBegin" className="form-label">From</label>
                                            <DatePicker
                                                id='dateBegin' 
                                                name='dateBegin'
                                                dateFormat="YYYY-MM-DD HH:mm:ss"
                                                className='form-control'
                                                placeholderText="From Datetime"
                                                selected={moment(this.state.fromDate)}
                                                onChange={this.handleFromChange}
                                                showTimeSelect />
                                        </div>
                                        <div className="col-6">
                                            <label for="dateEnd" className="form-label">To</label>
                                            <DatePicker
                                                id='dateEnd' 
                                                name='dateEnd'
                                                dateFormat="YYYY-MM-DD HH:mm:ss"
                                                className='form-control'
                                                placeholderText="To Datetime"
                                                selected={moment(this.state.toDate)}
                                                onChange={this.handleToChange}
                                                showTimeSelect />
                                        </div>
                                    </div>
                                </div>
                                <div className='form-group'>
                                    <FormGroup>
                                        <label for="stations" className="form-label">Stations</label>
                                        <Input type="select" name="selectMulti" id="exampleSelectMulti" multiple>
                                            <option value="Temperature">Station1</option>
                                            <option value="Pressure">Station2</option>
                                            <option value="Humidity">Station3</option>
                                        </Input>
                                    </FormGroup>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button type='button' color="secondary" onClick={this.toggleFilter}>Cancel</Button>
                                <Button type='button' color="primary" onClick={this.updateGraph}>Submit</Button>
                            </ModalFooter>
                        </form>
                    </Modal>
                    <div className="filter row">
                        <Button type='button' color="primary" className="btn btn-primary filter-btn" onClick={this.toggleFilter}>Filter</Button>
                    </div>
                    {this.renderGraph() }
                </div>
            )
        }

       else {
            return (
                null
            );
        }
    }
}
export default HistoricalContainer;