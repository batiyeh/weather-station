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
    //when component loads, calls function verify, if false is returned, sets redirect state to true
    componentDidMount = async () => {        
        if(!await this.verify()){
            this.setState({redirect: true});
        }
    }      
    //does a fetch call that returns the username currently stored in the cookie
    //if no username is stored, the user is not logged in and returns false
    verify = async () => {
        var response = await fetch('/api/user/verifyLoggedIn', {method: 'post', credentials: 'include'})
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
        //if redirect state is set to true, redirects user to login
        if(redirect) {
            return <Redirect to='/user/login'/>;
        }
        else {
            return true;
        }
    }
}

export default VerifyLoggedIn;