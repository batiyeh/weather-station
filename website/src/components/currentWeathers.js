import React, { Component } from 'react';
import "./currentWeather.css";

class Content extends Component {
    constructor() {
      super();
      this.state = {
          weather: [],
    };
}

componentDidMount() {
    fetch('http://api.openweathermap.org/data/2.5/weather')
        .then(results => {
            return results.json();
    })
        this.setState({weather: weather});
        console.log("state", this.state.pictures);
    })
}

render(){
    return(

      {this.state.weather}

    )