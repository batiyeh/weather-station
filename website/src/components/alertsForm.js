import React, { Component } from 'react';
import '../styles/alerts.css';

class AlertsForm extends Component {
    render(){
        return(
            <div className='Alerts-container'>
                <div id='alerts'>
                    <form id='alertsForm' action='' method='post'>
                        <div className='form-group'>
                                <input type='checkbox' id='email' name='email' value='email'/>email 
                                <input type='checkbox' id='sms' name='sms' value='sms'/>sms 
                                <input type='checkbox' id='webpage' name='webpage' value='webpage'/>webpage 
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default AlertsForm;