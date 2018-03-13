import React, { Component } from 'react';
import '../../styles/historical.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input } from 'reactstrap';
import TemperatureGraph from './temperatureGraph'
import DatePicker  from 'react-datepicker'
require("react-datepicker/dist/react-datepicker-cssmodules.css");

class HistoricalContainer extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: [],
            modal: false,
            loading: true,
            fromDate: '',
            toDate: ''
        }
        this.toggleFilter = this.toggleFilter.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
        this.handleToChange = this.handleToChange.bind(this);
        this.handleFromChange = this.handleFromChange.bind(this);
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
    }

    handleFromChange(date) {
        this.setState({
            fromDate: date
        });
    }

    getTemp = async () => {
        var Data;
        const response = await fetch('/api/weather/temp/');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        if (body.temp) Data = body.temp;
        this.setState({
            data: Data,
            loading: false});


    };


    render(){
        if(this.state.loading == false){
            return(
                <div>
                    <Modal isOpen={this.state.modal} toggle={this.toggleFilter}>
                        <ModalHeader toggle={this.toggleFilter}>Filter Historical Graph</ModalHeader>
                        <form id='filterForm'>
                            <ModalBody>
                                <div className='form-group'>
                                    <label for="dataType" class="form-label">Type</label>
                                    <select id='dataType' name='dataType'  className='form-control'>
                                        <option value="Temperature">Temperature</option>
                                        <option value="Pressure">Pressure</option>
                                        <option value="Humidity">Humidity</option>
                                    </select>

                                </div>
                                <div className='form-group'>
                                    <div className="row">
                                        <div className="col-6 no-padding-left">
                                            <label for="dateBegin" class="form-label">From</label>
                                            <DatePicker
                                                id='dateBegin' 
                                                name='dateBegin'
                                                dateFormat="YYYY-MM-DD"
                                                className='form-control'
                                                selected={this.state.fromDate}
                                                onChange={this.handleFromChange} />
                                        </div>
                                        <div className="col-6 no-padding-right">
                                            <label for="dateEnd" class="form-label">To</label>
                                            <DatePicker
                                                id='dateEnd' 
                                                name='dateEnd'
                                                dateFormat="YYYY-MM-DD"
                                                className='form-control'
                                                selected={this.state.toDate}
                                                onChange={this.handleToChange} />
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
                                <Button type='button' color="Primary" onClick={this.toggleFilter}>Submit</Button>
                            </ModalFooter>
                        </form>
                    </Modal>
                    <div className="filter row">
                        <Button type='button' className="btn btn-primary" onClick={this.toggleFilter}>Filter</Button>
                    </div>
                        <TemperatureGraph className="filter row"
                            data={this.state.data}
                            height={500}
                            width={700}
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