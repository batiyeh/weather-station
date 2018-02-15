import React, { Component } from 'react';
import '../styles/App.css';

class Confirm extends Component {
  // Look into conditional rendering to remove the need for this page?
  render() {
    return (
        <div className='confirmPage'>
            <h1> The admins have been notified of your account creation. Please allow them time to verify your account</h1>
            <h2> Click <a href='/user/login'>here</a> to return to the login page</h2>
        </div>
    );
  }
}

export default Confirm;