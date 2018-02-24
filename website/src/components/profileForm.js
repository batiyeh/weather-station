import React, { Component } from 'react';
import '../styles/profile.css';

class ProfileForm extends Component {
    render(){
        return(
            <div className='profile-container'>
                <div id='profile'>
                    <form id='profileForm' action='/api/user/editProfile/'method='post'>
                        <div className='profile-info mb-3'>
                        <div className='col-12 row'>
                            <a className="forgot-link" id="forgot" href="/user/reset">Forgot password?</a> 
                        </div>
                        <div className='form-group'>
                            <input id='email' name='email' type='email' className='form-control' placeholder='Email'/>
                        </div>
                        <div className='form-group'>
                            <input id='phone' name='phone' type='text' className='form-control' placeholder='Phone Number'/>
                        </div>
                        </div>
                        <div className='row'>
                            <div className='col-6'>
                                <button type='submit' className='btn btn-default btn-block profile-btn'>Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default ProfileForm;