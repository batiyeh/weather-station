import React, { Component } from 'react';
import '../styles/App.css';
import Navigation from '../components/navigation.js';
import Station from '../containers/stations.js';
import Map from '../containers/map.js';
import Login from '../containers/login.js';
import Create from '../containers/create.js';
import Historical from '../containers/historical.js';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className="main">
            <Route path="/stations" component={Station}/>
            <Route path="/map" component={Map}/>
            <Route path="/user/login" component={Login}/>
            <Route path="/user/create" component={Create}/>  
            <Route path="/historical" component={Historical}/>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
