import React, { Component } from 'react';
import VerifyLoggedIn from '../components/verifyLoggedIn.js'
import historicalGraph from '../components/historicalGraph'
import '../styles/App.css';

class Historical extends Component {
    render() {
        return (
            <div className='NavBar'>
                <VerifyLoggedIn/>
                <historicalGraph></historicalGraph>
            </div>
        );
    }
}



export default Historical;
