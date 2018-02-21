import React, { Component } from 'react';
import '../styles/App.css';
import CreateUserForm from '../components/registration/createUserForm.js';

class Create extends Component {
  render() {
    return (
        <CreateUserForm/>
    );
  }
}

export default Create;