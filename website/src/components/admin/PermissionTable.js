import React, { Component } from 'react';
import { Table, Input} from 'reactstrap';

class PermissionTable extends Component{

    constructor() {
        super();
        this.state = {
            permissions: [],
            users: [],
            modal: false,
        }
    };

    getalluser = async () => {
        var users = [];
        const response = await fetch('api/user/getUser', {method: 'get'});
        const body = await response.json();
        var pendingUsers = body.pendingU;
        console.log(pendingUsers);
        if (response.status !== 200) throw Error(body.message);
        this.setState({pending:pendingUsers, selectedUser:pendingUsers[0]})
    };
}

export default PermissionTable;