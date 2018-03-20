import React, { Component } from 'react';
import '../../styles/historical.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input } from 'reactstrap';
import TemperatureGraph from './temperatureGraph'
import DatePicker  from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
var moment = require('moment');
moment().format();

class HistoricalContainer extends Component{
    constructor(props){
        super(props);
        this.state = {
            stationsData: {},
            modal: false,
            loading: true,
            sensorType: 'temperature',
            fromDate: moment().format('YYYY-MM-DD'),
            toDate: moment().format('YYYY-MM-DD')
        }
        this.toggleFilter = this.toggleFilter.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
        this.handleToChange = this.handleToChange.bind(this);
        this.handleFromChange = this.handleFromChange.bind(this);
        this.handleSenseChange = this.handleSenseChange(this);
    }

    toggleFilter(){
        this.setState({
            modal: !this.state.modal
        })
    }

    componentWillMount() {
        this.getTemp()
    }

    handleToChange(date) {
        this.setState({
            toDate: date
        });
        console.log(this.state.toDate);
    }

    handleFromChange(date) {
        this.setState({
            fromDate: date
        });
    }
    handleSenseChange(value) {
        this.setState({
            sensorType: value
        });
        console.log(this.state.sensorType);
    }

    getTemp = async () => {
        var data;
        var stationsDict = {};
        var toDate = this.state.toDate;
        var fromDate = this.state.fromDate;
        const response = await fetch('/api/weather/temp/' + fromDate +'/' + toDate,
        );
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        if (body.temp) data = body.temp;
        for (var i = 0; i < data.length; i++) {
            var station_name = data[i].station_name;
            if (!stationsDict[station_name]) stationsDict[station_name] = {"temp": [], "dates": []};
            stationsDict[station_name]["temp"].push(data[i].temperature);
            stationsDict[station_name]["dates"].push(data[i].created_at);
        }
        this.setState({
            stationsData: stationsDict,
            loading: false
        });
    };



    render(){
        if(this.state.loading == false){
            return(
                <div className="historical-container">
                    <Modal isOpen={this.state.modal} toggle={this.toggleFilter}>
                        <ModalHeader toggle={this.toggleFilter}>Filter Historical Graph</ModalHeader>
                        <form id='filterForm'>
                            <ModalBody>
                                <div className='form-group'>
                                    <label>Data Type</label>
                                    <Input type="select" name='senseType' id='senseType' value={this.state.sensorType} onChange={e => this.handleSenseChange(e.target.value)}>
                                        <option value='temperature'>Temperature</option>
                                        <option value='humidity'>Humidity</option>
                                        <option value='pressure'>Pressure</option>
                                    </Input>
                                </div>
                                <div className='form-group'>
                                    <div className="row">
                                        <div className="col-6">
                                            <label for="dateBegin" class="form-label">From</label>
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
                                            <label for="dateEnd" class="form-label">To</label>
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
                                        <label for="stations" class="form-label">Stations</label>
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
                                <Button type='button' color="primary" onClick={this.getTemp()}>Submit</Button>
                            </ModalFooter>
                        </form>
                    </Modal>
                    <div className="filter row">
                        <Button type='button' color="primary" className="btn btn-primary filter-btn" onClick={this.toggleFilter}>Filter</Button>
                    </div>
                        <TemperatureGraph className="row graph"
                            data={this.state.stationsData}
                            from={this.state.fromDate}
                            to={this.state.toDate}
                            height={500}
                            width={800}
                        />
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