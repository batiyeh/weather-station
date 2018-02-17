import React, { Component } from 'react';

class Verify extends Component{
    constructor() {
        super();
        this.state = {};
    }
    componentDidMount() {
        this.veri();
    }      
    veri = async () => {
        const response = await fetch('/api/user/verify', {method: 'get', credentials: 'include'});
        const body = await response.json();
    
        if(response.status !== 200) throw Error(body.message);
        return body;
    }
    render(){
        return(null); 
    }
}

export default Verify;