import React, { Component } from 'react';
import {Input, options, o} from 'reactstrap';

const checkbox = ({checked, onChange}) => {
    return(
        <Input type={"checkbox"} checked={checked} onChange={ev => onChange(ev.target.checked)} />
    );
};

class checkboxes extends Component{
    constructor(){
        super();
        this.state = {
            options: [{id: "1", checked: true}, {id: "2", checked: false}]
        };
    }

    checkboxChange(checked,options) {
        const {options} = this.state;
        var conOptions = [...options];
        for (var i in conOptions){
            if(conOptions[i].id == option.id){
                conOptions[i].checked = checked;
            }
        }
        this.setState({
            options: conOptions
        }, () => console.log(options));
    }

    render(){
        const {option} = this.state;

        return(
            <div>
                {
                    this.state.options.map(option => {
                        return(
                            <checkbox key ={option.id} checked={option.checked} onChange={value => this.checkboxChange(value, option)} />
                        )
                    })
                }
            </div>

        );
    }
}

