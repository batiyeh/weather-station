import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert } from 'reactstrap';
import VerifyLoggedIn from '../components/verifyLoggedIn.js'
import HistoricalContainer from '../components/historical/historicalContainer'
import '../styles/App.css';
import '../styles/historical.css';

class Historical extends Component {
    render() {
        return (
            <div className='NavBar'>
                <VerifyLoggedIn/>
                <div id="historical-container">
                    <h2 className="page-title">Historical Graph</h2>
                    <HistoricalContainer></HistoricalContainer>
                    <div class="filter">
                        <div class="col-sm-8">
                            <Button type='button' className="btn btn-secondary btn-block">Filter</Button>
                        </div>
                    </div>
                 </div>
            </div>
        );
    }
}



export default Historical;
