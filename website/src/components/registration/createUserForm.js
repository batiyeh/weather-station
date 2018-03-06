import React, { Component } from 'react';
import '../../styles/login.css';
import {Alert, Button, Input} from 'reactstrap';
import { Redirect } from 'react-router';

class CreateUserForm extends Component {
    constructor(props){
        super(props);
        this.state={
            redirect: false,
            username: '',
            email: '',
            password: '',
            errors: []
        };
        this.submitForm = this.submitForm.bind(this);
        this.renderErrors = this.renderErrors.bind(this);
    }
    onUsernameChange(value){
        this.setState({
          username: value
        })
    }
    onEmailChange(value){
        this.setState({
          email: value
        })
    }
    onPasswordChange(value){
        this.setState({
          password: value
        })
    }
    submitForm = async () => {
        var response = await fetch('/api/user/create/', 
            {method: 'post', 
            body: JSON.stringify({
                username: this.state.username,
                email: this.state.email,
                password: this.state.password
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
          redirect: body.redirect
        })

    }
    renderErrors(){
        if(this.state.errors.length > 0){
            var allErrors = []
            this.state.errors.map(errors =>{
              allErrors.push(<Alert className='error-alert'>{errors.msg}</Alert>)
          })
          return allErrors;
        }
    }
    render(){
        if(this.state.redirect){
        return ( <Redirect to='/user/login'/>)
        }
        else{
        return(
            <div className='register-container'> 
            <h2 className="login-title">Create Account</h2> 
            <form id='createForm'>
              <div className='login-info mb-3'>
                <div className='form-group'>            
                {this.renderErrors()}

                  <Input id='username' name='username' type='text' className='form-control' placeholder='Username' onChange={e => this.onUsernameChange(e.target.value)}/>
                </div>
                <div className='form-group'>
                  <Input id='email' name='email' type='email' className='form-control' placeholder='Email' aria-label='Email' onChange={e => this.onEmailChange(e.target.value)} />
                </div>
                <div className='form-group'>
                  <Input id='password' name='password' type='password' className='form-control' placeholder='Password' aria-label='Password' onChange={e => this.onPasswordChange(e.target.value)} />
                </div>
              </div>
              <div className='row'>
                <div className='col-6 no-padding-left'>
                  <a className='return-link' href='/user/login'><Button type='button' className='btn btn-default btn-block return-btn'>Return</Button></a>                
                </div>
                <div className='col-6 no-padding-right'>
                  <Button type='button' onClick={this.submitForm} className="btn btn-default btn-block">Submit</Button>
                </div>
              </div>
            </form>
        </div>
        )}
    }
}

export default CreateUserForm;