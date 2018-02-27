import React, { Component } from 'react';
import VerifyLoggedIn from '../components/verifyLoggedIn.js'
import AlertsForm from '../components/alertsForm.js';

class Alerts extends Component {
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