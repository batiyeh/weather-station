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
      return(
        <div id="reset-page">
          <ResetPasswordConfirmForm token={this.props.match.params.token}/>
        </div>
      );
    }
    else{
      return (
        <div id="reset-page">
          <ResetPasswordForm/>
        </div>
      );
    }
  }
}

export default ResetPassword;