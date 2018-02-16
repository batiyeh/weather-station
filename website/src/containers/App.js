import React, { Component } from 'react';
import '../styles/App.css';
import Navigation from '../components/navigation.js';
import Station from '../containers/stations.js';
import Map from '../containers/map.js';
<<<<<<< HEAD
import Login from '../containers/login.js';
import Create from '../containers/create.js';
import Historical from '../containers/historical.js';
import Confirm from '../containers/confirm.js';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
=======
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Historical from '../containers/historical.js'

>>>>>>> 7de18374eb162c6fa6fe5cb517aa7bc0249a26ee

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
            <Route path='/user/confirm' component={Confirm}/>
            <Route path="/historical" component={Historical}/>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
