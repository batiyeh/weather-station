import React, { Component } from 'react';
import '../styles/App.css';
import Navigation from '../components/navigation.js';
import Station from '../containers/stations.js';
import Map from '../containers/map.js';
import Login from '../containers/login.js';
import Create from '../containers/create.js';
import Historical from '../containers/historical.js';
import ResetPassword from '../containers/resetPassword.js';
import Alerts from '../containers/alerts.js'
import ProfileForm from '../components/registration/profileForm.js';
import VerifyLoggedIn from '../components/verifyLoggedIn.js'
import Admin from '../containers/admin.js'

import {BrowserRouter as Router, Route} from 'react-router-dom';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      email: '',
      phone: '',
      isAdmin: false
    }
  }
  componentDidMount(){
    this.getUser();
  }

  getUser = async() => {
    var response = await fetch('/api/user/getUserInfo', {method: 'post', credentials: 'include'})
    var body = await response.json();
    if(!body.phone){
      this.setState({username: body.username, email: body.email, phone: 'Phone Number', isAdmin: body.isAdmin});
    }
    else{
      this.setState({username: body.username, email: body.email, phone: body.phone, isAdmin: body.isAdmin});      
    }
  }

  renderNav = (props) => {
    if (!window.location.pathname.includes('/user')){
      return (
        <Navigation 
          username={this.state.username}
          {...props}
        />
      );
    }

    else return null;
  }

  renderProfile = (props) => {
    return (
    <div className='ProfilePage'>
      <VerifyLoggedIn/>
      <ProfileForm
      username={this.state.username} 
      email={this.state.email} 
      phone={this.state.phone} 
      isAdmin={this.state.isAdmin}
      {...props}
      />
    </div>
    )
  }

  render(props) {
    return (
      <Router>
        <div className="App">
          <Route path='/' username={this.state.username} render={this.renderNav}/>  
          <div className="main">
            <Route path="/" component={Station} exact/>
            <Route path="/map" component={Map}/>
            <Route path="/user/login" component={Login}/>
            <Route path="/user/create" component={Create}/>  
            <Route path="/user/reset" component={ResetPassword} exact/>
            <Route path="/user/reset/:token" component={ResetPassword}/>
            <Route path="/profile" render={this.renderProfile}/>
            <Route path="/historical" component={Historical}/>
            <Route path="/alerts" component={Alerts}/>
            <Route path="/admin" component={Admin}/>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
