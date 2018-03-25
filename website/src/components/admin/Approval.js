import React, { Component } from 'react';
import { Table, ButtonDropdown,DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap';


class Approval extends Component {

    constructor() {
        super();
        this.state = {
            pending: [],
            users: [],
            modal: false,
            dropdownOpen: false
        }

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
        // this.setState({users: usersarray})
        console.log(users)
        return users;
    };

    updateTable = async () => {
        this.getuser().then(users => {
            this.setState({
                users: users
            });
        });
    };

    renderAlert() {

    };

    render() {
        return(
            <Table hover>
            <thead>
            <tr>
                <th>#</th>
                <th>Username</th>
                <th>Permission</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td> body.users.['Username']</td>
                { this.state.users
                    .map(user => {
                        {user}
                    })
                }
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
        );
    }
}

export default Approval;