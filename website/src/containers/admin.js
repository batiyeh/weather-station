import React, { Component } from 'react';
import VerifyLoggedIn from '../components/verifyLoggedIn.js';
import AdminStationList from '../components/admin/adminStationList.js';
import '../styles/admin.css';

class Alerts extends Component {
    render() {
        return (
            <div className='adminPage'>
                <VerifyLoggedIn/>
                <AdminStationList></AdminStationList>
            </div>
        );
    }
}

export default Alerts;