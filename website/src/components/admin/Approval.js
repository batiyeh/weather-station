import React, { Component } from 'react';
import { ButtonDropdown,DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap';


class Approval extends Component {

    constructor(){
      super();
      this.state = {
          pending: [],
          users: [],
          modal: false,
      }
      this.toggle = this.toggle.bind(this);
      this.state = {
          dropdownOpen: false
      };
    };

    toggle(){
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

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
        this.setState({ users: usersarray })
        return users;
    };

    updateTable = async() => {


    };

    renderAlert(){

    };

    render (){
        <Table hover>
            <thead>
            <tr>
                <th>#</th>                                  //this is the top of the table headers
                <th>Username</th>
                <th>Permission</th>
            </tr>
            </thead>
            <tbody>
            <tr>                                            //This should be printing from the database
                <th scope="Column">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
            </tr>
            <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
            </tr>
            <tr>
                <th scope="row">3</th>
                <td>Larry</td>
                <td>the Bird</td>
                <td>@twitter</td>
            </tr>
            </tbody>
        </Table>
    };
};

export default Approval;