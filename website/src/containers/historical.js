import React, { Component } from 'react';
import Navigation from '../components/navigation.js';
import VerifyLoggedIn from '../components/verifyLoggedIn.js'
import '../styles/App.css';

class Historical extends Component {
    render() {
        return (
            <div className='NavBar'>
                <VerifyLoggedIn/>
                <Navigation/>
            </div>
        );
    }
}

export default Historical;
