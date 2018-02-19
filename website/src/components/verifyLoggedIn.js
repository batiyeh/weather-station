import React, { Component } from 'react';
import { Redirect } from 'react-router';

class VerifyLoggedIn extends Component{
    constructor() {
        super();
        this.user = null;
        this.state = {
            redirect: false
        }
    }
    componentDidMount = async () => {        
        if(await this.veri()){
            console.log("true");
        }
        else{
            this.setState({redirect: true});
        }
    }      
    veri = async () => {
        var response = await fetch('/api/user/auth', {method: 'post', credentials: 'include'})
        var body = await response.json();
        this.user = body.user;
        if(this.user){
            return true;
        }
        else{
            return false;
        }
    }
    render(){
        const { redirect } = this.state;

        if(redirect) {
            return <Redirect to='/user/login'/>;
        }
        else {
            return null;
        }
    }
}

export default VerifyLoggedIn;