import React, { Component } from 'react';
import {Input,} from 'reactstrap';

const checkbox = ({checked, onChange}) => {
    return(
        <Input type={"checkbox"} checked={checked} onChange={ev => onChange(ev.target.checked)} />
    );
};

class checkboxes extends Component{
    constructor(){
        super();
    }
    this.state = {
        options: [{id: "1", checked: true}, {id: "2", checked: false}]
    };
}

checkboxChange (checked,option) {
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
        <div id="root"></div>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.1.0/react.min.js"> </script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.1.0/react-dom.min.js"></script>

        <div>
            {
                options.map(option => {
                    return(
                        <checkbox key ={option.id} checked={option.checked} onChange={value => this.checkboxChange(value, option)} />}
                    )
                })
            }
        </div>

    );
}
}

