import React, { Component } from 'react';
import { Table, Alert, Button } from 'reactstrap';

class AdminPermission extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
            loading: true
        }
        this.updateUser = this.updateUser.bind(this);
    };

    // Set the pendingUsers array in the state
    componentDidMount(){
        this.getUsers().then((users) => {
            this.setState({
                users: users,
                loading: false
            })
        });
    }

    // Get all pending users
    getUsers = async () => {
        var users = [];
        const response = await fetch('api/user/allUsers', {method: 'get'});
        const body = await response.json();
        if (body.users.length > 0) users = body.users;
        if (response.status !== 200) throw Error(body.message);
        return users;
    };

    // Update the list of pending users
    updateTable(){
        this.getUsers().then((users) => {
            this.setState({
                users: users,
                loading: false
            })
        });
    };

    // Update a single user with a permission type
    updateUser = async (user, type) => {
        await this.setState({ loading: true });
        await fetch ('/api/user/permissions', { method: 'put',
            body: JSON.stringify({
                username: user["username"],
                permissions: type
            }),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            credentials:'include'}
        );
        this.updateTable();
    };


    render() {
        if (this.state.loading === true){
            return (
                <div>
                    <Alert className="no-users-alert" color="primary">
                        Loading user table.
                    </Alert>
                </div>
            );
        } else{
            return(
                <Table className="admin-table" bordered>
                    <thead>
                    <tr>
                        <th>Username</th>
                        <th>Permissions</th>
                        <th>Update</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.users.map((user) => {
                            return (
                                <tr>
                                    <td className="admin-table-username">
                                        { user["username"] }
                                    </td>
                                    <td className="admin-table-userpermissions">
                                        { user["type"]}
                                    </td>
                                    <td className="admin-table-buttons">
                                        <div className="row">
                                            <div className="col-6">
                                                <Button color="primary" onClick={() => this.updateUser(user, "Admin")}>Promote</Button>
                                            </div>
                                            <div className="col-6">
                                                <Button color="danger" onClick={() => this.updateUser(user, "User")}>Demote</Button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })
                    }
                    </tbody>
                </Table>
            );
        }
    }
}

export default AdminPermission;