import React, { Component } from 'react';
import '../../styles/login.css';
import {Alert, Button, Input} from 'reactstrap';
import { Redirect } from 'react-router';
import Cookies from 'js-cookie';
import _ from 'lodash';

import logo from '../../images/space-satellite-dish-512x512.png';

class LoginForm extends Component {
    constructor(props){
        super(props);
        var redirect = Cookies.get('loggedIn')
        if (_.isUndefined(redirect)) redirect = false;
        this.state={
            username: '',
            password: '',
            errors: [],
            redirect: redirect
        };
        this.submitForm = this.submitForm.bind(this);
        this.renderErrors = this.renderErrors.bind(this);
    }
    onUsernameChange(value){
        this.setState({
          username: value
        })
    }
    onPasswordChange(value){
        this.setState({
          password: value
        })
    }

    submitForm = async () => {
        var response = await fetch('/api/user/login/', 
            {method: 'post', 
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
            }),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            credentials:'include'
            });

        var body = await response.json();
        console.log(body.redirect);
        this.setState({
          errors: body.errors,
          redirect: body.redirect
        })

        if(body.redirect){
            Cookies.set('loggedIn', true)
        }
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
    
    render(){
        if(this.state.redirect === true){
            return (<Redirect to='/'/>)
        }
        else{
            return(
                <div className='login-container'>
                    <div id='login'>
                        <img src={logo} className="login-logo" width="200" height="200" alt=""></img>
                        <form id='loginForm'>
                            <div className='login-info mb-3'>
                            <div className='col-12 row'>
                                <a className="forgot-link" id="forgot" href="/user/reset">Forgot password?</a> 
                            </div>
                            <div className='form-group'>
                                <Input id='username' name='username' type='text' className='form-control' placeholder='Username' onChange={e => this.onUsernameChange(e.target.value)}/>
                            </div>
                            <div className='form-group'>
                                <Input id='password' name='password' type='password' className='form-control' placeholder='Password' onChange={e => this.onPasswordChange(e.target.value)}/>
                            </div>
                            </div>
                            <div className='row'>
                                <div className='col-6'>
                                    <a className='register-link' href='/user/create'><button type='button' className='btn btn-default btn-block register-btn'>Register</button></a>
                                </div>
                                <div className='col-6'>
                                    <Button type='button' onClick={this.submitForm} className='btn btn-default btn-block login-btn'>Login</Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )
        }
    }
}

export default LoginForm;