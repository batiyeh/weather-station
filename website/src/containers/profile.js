import React, { Component } from 'react';
import Navigation from '../components/navigation.js';
import VerifyLoggedIn from '../components/verifyLoggedIn.js'
import ProfileForm from '../components/profileForm.js';

class Profile extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div className='ProfilePage'>
                <VerifyLoggedIn/>
                <ProfileForm {...props}/>
            </div>
        );
    }
}

export default Profile;