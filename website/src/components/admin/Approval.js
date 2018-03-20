import React, { Component } from 'react';
import { Button, Alert, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


class Approval extends Component {

    constructor(){
      super();
      this.state = {
          pending: [],
          modal: false,
      }
    };

    getInitialState(){
        return {
            pending: []
        }
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