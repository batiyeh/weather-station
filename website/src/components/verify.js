import React, { Component } from 'react';

class Verify extends Component{
    constructor() {
        super();
        this.state = {};
    }
    componentDidMount(res) {        
        this.veri()
    }      
    veri = async () => {
        await fetch('/api/user/verify', {method: 'post', redirect: 'follow', credentials: 'include'})
        .then(res => {
            // res.redirect('/user/login');
        });
    }
    render(){
        return(null); 
    }
}

export default Verify;