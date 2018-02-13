import React, { Component } from 'react';
import '../styles/App.css';
import Navigation from '../components/navigation.js';
import Station from '../containers/stations.js';
import Map from '../containers/map.js';
import Historical from '../containers/historical.js'
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navigation></Navigation>
          <div className="main">
            <Route path="/stations" component={Station}/>
            <Route path="/map" component={Map}/>
            <Route path="/historical" component={Historical}/>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
