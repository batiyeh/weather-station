import React, { Component } from 'react';
import { Table, Input} from 'reactstrap';


class Approval extends Component {

    constructor() {
        super();
        this.state = {
            pending: [],
            users: [],
            modal: false,
            dropdownOpen: false,
            selectedUser: null,
            statusP: null,
        }
        this.onpendingChange = this.onpendingChange.bind(this);
        this.approveUser = this.approveUser.bind(this);
        this.denyUser = this.denyUser.bind(this);
        this.updateUser = this.updateUser.bind(this);

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
        var pendingUsers = body.pendingU;
        console.log(pendingUsers);
        if (response.status !== 200) throw Error(body.message);
        this.setState({pending:pendingUsers, selectedUser:pendingUsers[0]})
    };

    updateTable = async () => {
        this.getuser().then(users => {
            this.setState({
                users: users
            });
        });
    };

    approveUser = async ()=> {
        await this.setState({
            statusP: true
        })
        this.updateUser()
    }

    denyUser = async ()=> {
        await this.setState({
            statusP: false
        })
        this.updateUser()
    }

    updateUser = async ()=> {
        console.log(this.state.statusP);
        await fetch ('/api/user/approveUser',
            {method: 'post', body: JSON.stringify({selectedUser: this.state.selectedUser, statusP: this.state.statusP}),
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                credentials:'include'});


}

    renderpendingUsers() {
        var pusers = []
        this.state.pending.map((pendingUsers => {
            pusers.push(<option value={pendingUsers.username}>{pendingUsers.username}</option>)
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
    }

    render() {
        return(
            <Table hover>
            <thead>
            <tr>
                <th>Username</th>
                <th>Permission</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <Input type="select" name='pending' id='pending' onChange={e => this.onpendingChange(e.target.value)}>
                    {this.renderpendingUsers()}
                </Input>
                <button type='button' color="primary" onClick={this.approveUser}>Approve </button>
                <button type='button' color="secondary" onClick={this.denyUser}>Deny</button>
            </tr>
            </tbody>
        </Table>
        );
    }
}

export default Approval;