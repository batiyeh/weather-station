import React, { Component } from 'react';
import '../../styles/login.css';
import {Alert, Button, Input} from 'reactstrap';
import { Redirect } from 'react-router';
import Cookies from 'js-cookie';
import _ from 'lodash';


class ResetPasswordForm extends Component {
    constructor(props){
        super(props);

        var redirect = Cookies.get('loggedIn')
        if (_.isUndefined(redirect)) redirect = false;
        
        this.state={
            email: '',
            errors: [],
            redirect: redirect
        };
        this.submitForm = this.submitForm.bind(this);
        this.renderErrors = this.renderErrors.bind(this);
    }
    submitForm = async () => {
        var response = await fetch('/api/user/reset/', 
            {method: 'post', 
            body: JSON.stringify({
                email: this.state.email,
            }),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            credentials:'include'
            });

        var body = await response.json();
        this.setState({
          errors: body.errors,
        })
    }
    renderErrors(){
        if(this.state.errors.length > 0){
            var allErrors = []
            this.state.errors.map(errors =>{
                allErrors.push(<Alert className='alert-danger error-alert'>{errors.msg}</Alert>)
                return null;
            })
          return allErrors;
        }
    }
    onEmailChange(value){
        this.setState({
          email: value
        })
    }
    render(){
        return(
            <div className="forgot-container">
                <h2 className="login-title">Reset Password</h2> 
                <form className='ResetPasswordForm'>
                    {this.renderErrors()}
                    <div className='form-group'>
                        <Input id='email' name='email' type='email' class='form-control' placeholder='Email'  onChange={e => this.onEmailChange(e.target.value)}/>
                    </div>
                    <div className='row'>
                        <div className='col-6'>
                            <a className='register-link' href='/user/login'><Button type='button' className='btn btn-default btn-block register-btn'>Return</Button></a>
                        </div>
                        <div className='col-6'>
                            <Button type='button' onClick={this.submitForm} className='btn btn-default btn-block login-btn'>Recover Password</Button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default ResetPasswordForm;
