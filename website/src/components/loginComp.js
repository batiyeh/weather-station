import React, { Component } from 'react';


class LoginComp extends Component {


    render(){
        return(
            <div id='login'>
                <form id='loginForm' action='/api/user/login/'method='post'>
                    <div className='login-info mb-3'>
                        <div className='form-group'>
                            <input id='username' name='username' type='text' class='form-control' placeholder='Username'/>
                        </div>
                        <div className='form-group'>
                            <input id='password' name='password' className='form-control' placeholder='Password'/>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-6'>
                            {/* add link to create user here */}
                        </div>
                        <div className='col-6'>
                            <button type='submit' className='btn btn-default login-btn'>Login</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default LoginComp;