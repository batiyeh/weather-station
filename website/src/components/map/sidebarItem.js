import React, { Component } from 'react';
import { FormGroup, Input, Alert, Label } from 'reactstrap';
import '../../styles/map.css';

class SidebarItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            station: this.props.station,
            backgroundColor: this.props.backgroundColor,
            checked: this.props.checked,
            index: this.props.index
        }
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.checked !== this.state.checked){
            var checked = this.state.checked;
            this.setState({
                checked: !checked
            })
        }
    }

    render() {
        var backgroundColor = "#ffffff";
        if (this.state.index % 2 == 0) backgroundColor = "#f4f4f4";
        
        return (
            <div key={this.state.station.apikey} style={{backgroundColor: backgroundColor}} className="list-item-container">
                <FormGroup check>
                    <Label check>
                        <Input type="checkbox" defaultChecked={true} onChange={(event) => this.props.checkboxOnChange(event, this.state.station)}/>{' '}
                        <span className="station-name">{this.state.station.station_name}</span>
                    </Label>
                </FormGroup>
            </div>
        );
    }

}

export default SidebarItem;