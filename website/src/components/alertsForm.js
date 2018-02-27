import React, { Component } from 'react';
import '../styles/alerts.css';

class AlertsForm extends Component {
    render(){
        return(
            <div className='container'>
                <div class="row">
                    <div class="col-4">
                        <div class="form-check form-check-inline alert-method-container">
                            <input type='checkbox' class="form-control alert-method-box" id='email' name='email' value='email'/>
                            <label class="form-check-label" for="email">email</label>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="form-check form-check-inline alert-method-container">
                            <input type='checkbox' class="form-control alert-method-box" id='sms' name='sms' value='sms'/>
                            <label class="form-check-label" for="sms">sms</label>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="form-check form-check-inline alert-method-container">
                            <input type='checkbox' class="form-control alert-method-box" id='webpage' name='webpage' value='webpage'/>
                            <label class="form-check-label" for="webpage">webpage</label>
                        </div>
                    </div>
                </div>
                <div id='alerts'>
                </div>
            </div>
        )
    }
}

export default AlertsForm;