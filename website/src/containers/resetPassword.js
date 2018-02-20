import React, { Component } from 'react';
import '../styles/App.css';
import ResetPasswordForm from '../components/registration/ResetPasswordForm.js';
import ResetPasswordConfirmForm from '../components/registration/ResetPasswordConfirmForm.js';

class ResetPassword extends Component {
  constructor(props){
    super(props);
}
  render() {
    if(this.props.match.params.token){
      return(<ResetPasswordConfirmForm token={this.props.match.params.token}/>);
    }
    else{
      return (<ResetPasswordForm/>);
    }
  }
}

export default ResetPassword;