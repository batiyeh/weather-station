import React, { Component } from 'react';
import { ButtonDropdown,DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap';


class Approval extends Component {

    constructor() {
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

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    getInitialState() {
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
        this.setState({users: usersarray})
        return users;
    };

    updateTable = async () => {
    when ()

    };

    renderAlert() {

    };

    render() {
        <html>
        <title>
            <head> Users</head>
        </title>
        <body>
        <Table hover>
            <thead>
            <tr>
                <th>#</th>
                //this is the top of the table headers
                <th>Username</th>
                <th>Permission</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td> body.users.['Username']</td>
                <buttonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                    <dropdownToggle caret>
                        body.permission.['Permission']  //shows what permission they have right now
                    </dropdownToggle>
                    <dropdownMenu>
                        <dropdownItem header> Admin </dropdownItem>
                        <dropdownItem header> User </dropdownItem>
                    </dropdownMenu>
                </buttonDropdown>
            </tr>
            </tbody>
        </Table>
        };
        </body>
        </html>
    };
}

export default Approval;