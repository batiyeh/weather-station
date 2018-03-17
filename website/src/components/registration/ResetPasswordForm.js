import React, { Component } from 'react';
import '../../styles/login.css';


class ResetPasswordForm extends Component {
    render(){
        return(
            <div className="forgot-container">
                <h2 className="login-title">Reset Password</h2> 
                <form className='ResetPasswordForm' action='/api/user/reset/' method='post' >
                    <div className='form-group'>
                        <input id='email' name='email' type='email' class='form-control' placeholder='Email'/>
                    </div>
                    <div className='row'>
                        <div className='col-6'>
                            <a className='register-link' href='/user/login'><button type='button' className='btn btn-default btn-block register-btn'>Return</button></a>
                        </div>
                        <div className='col-6'>
                            <button type='submit' className='btn btn-default btn-block login-btn'>Recover Password</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default ResetPasswordForm;