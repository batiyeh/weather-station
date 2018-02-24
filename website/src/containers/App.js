import React, { Component } from 'react';
import '../styles/App.css';
import Navigation from '../components/navigation.js';
import Station from '../containers/stations.js';
import Map from '../containers/map.js';
import Login from '../containers/login.js';
import Create from '../containers/create.js';
import Historical from '../containers/historical.js';
import ResetPassword from '../containers/resetPassword.js';
import Profile from '../containers/profile.js';
import Alerts from '../containers/alerts.js'

import {BrowserRouter as Router, Route} from 'react-router-dom';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: ''
    }
  }

  componentWillMount() {
    this.getUser().then(user => { 
        this.setState({ username: user });
    });
  }

  getUser = async() => {
    var response = await fetch('/api/user/verifyLoggedIn', {method: 'post', credentials: 'include'})
    var body = await response.json();
    this.user = body.user;
    if (this.user) return this.user;
    else return 'nouser';
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

  render() {
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
            <Route path="/profile" component={Profile}/>
            <Route path="/historical" component={Historical}/>
            <Route path="/alerts" component={Alerts}/>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
