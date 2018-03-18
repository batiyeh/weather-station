import React, { Component } from 'react';
import '../../styles/login.css';
import logo from '../../images/space-satellite-dish-512x512.png';

class LoginForm extends Component {z
    render(){
        return(
            <div className='login-container'>
                <div id='login'>
                    <img src={logo} className="login-logo" width="200" height="200" alt=""></img>
                    <form id='loginForm' action='/api/user/login/'method='post'>
                        <div className='login-info mb-3'>
                        <div className='col-12 row no-padding-left'>
                            <a className="forgot-link" id="forgot" href="/user/reset">Forgot password?</a> 
                        </div>
                        <div className='form-group'>
                            <input id='username' name='username' type='text' className='form-control' placeholder='Username'/>
                        </div>
                        <div className='form-group'>
                            <input id='password' name='password' type='password' className='form-control' placeholder='Password'/>
                        </div>
                        </div>
                        <div className='row'>
                            <div className='col-6'>
                                <a className='register-link' href='/user/create'><button type='button' className='btn btn-default btn-block register-btn'>Register</button></a>
                            </div>
                            <div className='col-6'>
                                <button type='submit' className='btn btn-default btn-block login-btn'>Login</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default LoginForm;