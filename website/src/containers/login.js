import React, { Component } from 'react';
import LoginForm from '../components/registration/loginForm.js';

class Login extends Component {
  render() {
    return (
        <div id="login-page">
          <LoginForm/>
        </div>
    );
  }
}

export default Login;