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
    }).then(data => {
        let weather = data.results.map(current) => {
            return(
                <div key={weather.results}>
                    <  />                     //enter the data here
                </div>
            )
    })
        this.setState({weather: weather});
        console.log("state", this.state.pictures);
    })
}

render(){
    return(

        <div className="container">
        <div className="container2">
            {this.state.weather}
        </div>
        </div>

    )