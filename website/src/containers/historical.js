import React, { Component } from 'react';
import Navigation from '../components/navigation.js';
import VerifyLoggedIn from '../components/verifyLoggedIn.js'
import '../styles/App.css';



class Historical extends Component {
    render() {
        return (
            <div className='NavBar'>
                <VerifyLoggedIn/>
                <h1>This is the Historical data page.</h1>
            </div>
        );
    }
}



export default Historical;
