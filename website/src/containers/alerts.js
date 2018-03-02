import React, { Component } from 'react';
import VerifyLoggedIn from '../components/verifyLoggedIn.js'
import AlertsForm from '../components/alertsForm.js';
import '../styles/profile.css';

class Alerts extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div className='AlertsPage'>
                <VerifyLoggedIn/>
                <AlertsForm/>
            </div>

        );
    }
}

export default Alerts;