import React, { Component } from 'react';
import { Button, Alert, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


class Approval extends Component {

    constructor(){
      super();
      this.state = {
          pending: [],
          users: [],
          modal: false,
      }
    };

    getInitialState(){
        return {
            pending: []
        }
    };

    getuser = async () => {
        var users = [];
        const response = await fetch('/api/allUsers');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        if (body.users) users = body.users;

        return users;
    };

    approveUser = async () => {

    };

    denyUser = async () => {

    };

    updateTable = async() => {

    };

    renderAlert(){

    };

    render (){

    };
};

export default Approval;