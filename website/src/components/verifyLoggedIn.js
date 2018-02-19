import React, { Component } from 'react';
import { cookies } from 'react-cookie';

class VerifyLoggedIn extends Component{
    constructor() {
        super();
        console.log(cookies.get('name'));
        this.state = {};
    }
    componentDidMount(res) {        
        this.veri()
    }      
    veri = async () => {
        await fetch('/api/user/auth', {method: 'post', credentials: 'include'})
        return true;
    }
    render(){
        return(null); 
    }
}

export default VerifyLoggedIn;