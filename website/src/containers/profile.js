import React, { Component } from 'react';
import Navigation from '../components/navigation.js';
import VerifyLoggedIn from '../components/verifyLoggedIn.js'
import ProfileForm from '../components/profileForm.js';

class Profile extends Component {
    render() {
        return (
            <div className='ProfilePage'>
                <VerifyLoggedIn/>
                <ProfileForm/>
            </div>
        );
    }
}

export default Profile;