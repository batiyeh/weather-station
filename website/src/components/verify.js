import React, { Component } from 'react';

class Verify extends Component{
    constructor() {
        super();
        this.state = {};
    }
    componentDidMount() {
        fetch('/api/user/verify', {
            method: 'post',
        })
    }
    render() {
        return null;
  }
}
export default Verify;