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
            fromDate: '2018-03-18 22:35:35',
            toDate: '2018-03-19 10:00:08'
        }
        this.toggleFilter = this.toggleFilter.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleToChange = this.handleToChange.bind(this);
        this.handleFromChange = this.handleFromChange.bind(this);

    }

    toggleFilter(){
        this.setState({
            modal: !this.state.modal
        })

    }

    componentDidMount() {
        this.getTemp()
    }

    handleToChange(date) {
        this.setState({
            toDate: date
        });
    }

    handleFromChange(date) {
        this.setState({
            fromDate: date
        });
    }
    onSenseChange(value) {
        this.setState({
            sensorType: value
        })
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

    renderGraph(){
        return(
            <TemperatureGraph className="row graph"
                data={this.state.stationsData}
                from={this.state.fromDate}
                to={this.state.toDate}
                height={500}
                width={800}
            />
        )
    }



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
                                <Button type='button' color="primary" onClick={this.toggleFilter}>Submit</Button>
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