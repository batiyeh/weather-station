import React, { Component } from 'react';
import '../../styles/historical.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import TemperatureGraph from './temperatureGraph'



class HistoricalContainer extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: [],
            modal: false,
            loading: true,
        }
        this.toggleFilter = this.toggleFilter.bind(this);
    }
    toggleFilter(){
        this.setState({
            modal: !this.state.modal
        })
    }
    componentWillMount(){
        this.getTemp();
    }

    getTemp = async () => {
        var tempData;
        const response = await fetch('/api/weather/temp/');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        if (body.temp) tempData = body.temp;
        this.setState({
            data: tempData,
            selectX: datum => new Date(datum.created_at),
            selectY: datum => parseFloat(datum.temperature),
            loading: false
        });
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
                                    <input id='currPass' name='currPass' type='password' className='form-control'/>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button type='button' color="secondary" onClick={this.toggleFilter}>Cancel</Button>
                            </ModalFooter>
                        </form>
                    </Modal>
                    <div className="filter row">
                        <Button type='button' className="btn btn-primary" onClick={this.toggleFilter}>Filter</Button>
                    </div>

                    <TemperatureGraph className="filter row"
                        data={this.state.data}
                        height={400}
                        selectX={datum => datum.created_at}
                        selectY={datum => datum.temperature}
                        width={500}
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