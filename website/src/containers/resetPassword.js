import React, { Component } from 'react';
import '../styles/App.css';
import ResetPasswordForm from '../components/registration/ResetPasswordForm.js';
import ResetPasswordConfirmForm from '../components/registration/ResetPasswordConfirmForm.js';

class ResetPassword extends Component {
//   constructor(props){
//     super(props);
// }
  render() {
    // console.log(this.props.match.params);
    // if(this.props.match.params.token){
      return(<ResetPasswordForm/>);
    // }
    // else{
    //   return (<ResetPasswordForm/>);
    // }
  }
}

export default ResetPassword;