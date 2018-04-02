import React, { Component } from 'react';
import { Table, Input} from 'reactstrap';

class PermissionTable extends Component{

    constructor() {
        super();
        this.state = {
            permissions: [],
            users: [],
            modal: false,
            selectedUser: null,
        }
        this.demoteUser = this.demoteUser.bind(this);
        this.promoteUser = this.promoteUser.bind(this);
        this.renderAllUsers = this.renderAllUsers.bind(this);

    }
    componentWillMount(){
        this.getalluser();
    }

    getalluser = async () => {
        var users = [];
        const response = await fetch('api/user/getUser', {method: 'get'});
        const body = await response.json();
        var getUsers = body.user;
        console.log(getUsers);
        if (response.status !== 200) throw Error(body.message);
        this.setState({permissions:getUsers, selectedUser:getUsers})
    };



    promoteUser = async ()=> {

    }

    demoteUser = async ()=> {

    }

    renderAllUsers(){
        var pusers = [];
        this.state.permissions.map(users => {
            pusers.push(<option value={users.username}>{users.username}</option>)
            //console.log(pendingUsers.username)
            return null;
        })
        console.log(pusers)
        return pusers;
    }

    onpendingChange(value){
        this.setState({
            selectedUser: value
        })
    }

    render(){
        return(
            <Table hover>
                <thead>
                <tr>
                    <th>Username</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <Input type="select" name='Username' id='user' onChange={e => this.onpendingChange(e.target.value)}>
                        {this.renderAllUsers()}
                    </Input>

                    <button type='button' color="primary" onClick={this.approveUser}>Promote </button>
                    <button type='button' color="secondary" onClick={this.denyUser}>Demote</button>
                </tr>
                </tbody>
            </Table>
        )
    }
}

export default PermissionTable;