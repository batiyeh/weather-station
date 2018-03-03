import React, { Component } from 'react';
import '../../styles/login.css';

class ResetPasswordConfirmForm extends Component {
    constructor(props){
        super(props);
        this.tokenUrl = '/api/user/reset/' + this.props.token;
    }
    render(){
        return(
            <div className="confirm-container">
                <h2 className="login-title">Reset Password</h2> 
                <form className='ResetPasswordForm' action={this.tokenUrl} method='post' >
                    <div className='form-group'>
                        <input id='password' name='password' type='password' class='form-control' placeholder='Password'/>
                    </div>
                    <div className='form-group'>
                        <input id='password2' name='password2' type='password' class='form-control' placeholder='Confirm Password'/>
                    </div>
                    <div className='row'>
                        <div className='col-6 no-padding-left'>
                            <button type='submit' className='btn btn-default btn-block login-btn'>Reset Password</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default ResetPasswordConfirmForm;