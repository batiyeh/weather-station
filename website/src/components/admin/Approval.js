import React, { Component } from 'react';
import { Table, Input, ButtonDropdown,DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap';


class Approval extends Component {

    constructor() {
        super();
        this.state = {
            pending: [],
            users: [],
            modal: false,
            dropdownOpen: false,
            selectedUser: null,
        }

    };
    componentWillMount(){
        this.getuser();
    }
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
        const response = await fetch('api/user/pendingUser', {method: 'get'});
        const body = await response.json();
        var pendingUsers = body.pendingU
        console.log(pendingUsers);
        if (response.status !== 200) throw Error(body.message);
        this.setState({pending:pendingUsers})
    };

    updateTable = async () => {
        this.getuser().then(users => {
            this.setState({
                users: users
            });
        });
    };

    renderpendingUsers() {
        var pusers = []
        this.state.pending.map((pendingUsers => {
            pusers.push(<option key={"name" + pendingUsers} value={pendingUsers.username}>{pendingUsers.username}</option>)
            //console.log(pendingUsers.username)
            return null;
        }))
        //console.log(pusers)
        return pusers;

    };

    onpendingChange(value){
        this.setState({
            selectedUser: value
        })
        console.log(this.state.selectedUser)
    }

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
                <Input type="select" name='pending' id='station' value={this.state.pending} onChange={e => this.onpendingChange(e.target.value)}>
                    {this.renderpendingUsers()}
                </Input>
                <buttonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                    <dropdownToggle caret>
                        body.permission.['Permission']
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