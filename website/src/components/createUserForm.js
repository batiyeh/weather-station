import React, { Component } from 'react';
// for validating entries use https://www.npmjs.com/package/react-validation

class CreateUserForm extends Component {
    render(){
        return(
            <div className = 'container'>  
            <form id='createForm' action='/api/user/create/' method='post'>
              <div className='login-info mb-3'>
                <div className='form-group'>
                  <input id='username' name='username' type='text' className='form-control' placeholder='Username'/>
                </div>
                <div className='form-group'>
                  <input id='email' name='email' type='email' className='form-control' placeholder='Email' aria-label='Email'/>
                </div>
                <div className='form-group'>
                  <input id='password' name='password' type='password' className='form-control' placeholder='Password' aria-label='Password'/>
                </div>
              </div>
              <div className='row'>
                <div className='col-6'>
                  <a className='return-link' href='/user/login'><button type='button' className='btn btn-default return-btn'>Return</button></a>                </div>
                <div className='col-6'>
                  <button type='submit' className="btn btn-default" onClick='created()'>Create Account</button>
                </div>
              </div>
            </form>
        </div>
        )
    }
}

export default CreateUserForm;