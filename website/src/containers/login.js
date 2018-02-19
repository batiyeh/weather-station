import React, { Component } from 'react';
import '../styles/App.css';
import LoginForm from '../components/loginForm.js';

class Login extends Component {
  render() {
    return (
        <LoginForm/>
    );
  }
}

export default Login;