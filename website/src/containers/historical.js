import React, { Component } from 'react';
import VerifyLoggedIn from '../components/verifyLoggedIn.js'
import HistoricalContainer from '../components/historical/historicalContainer'
import '../styles/App.css';

class Historical extends Component {
    render() {
        return (
            <div className='NavBar'>
                <VerifyLoggedIn/>
                <HistoricalContainer></HistoricalContainer>
            </div>
        );
    }
}



export default Historical;
