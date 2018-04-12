import React, { Component } from 'react';
import { Table, Alert, Button } from 'reactstrap';

class AdminPermission extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            loading: true,
            permissions: this.props.permissions
        }
        this.updateUser = this.updateUser.bind(this);
        this.updateTable = this.updateTable.bind(this);
    };


    componentDidMount(){
        this.getUsers().then((users) => {
            this.setState({
                users: users,
                loading: false
            })
        });
    }

    getUsers = async () => {
        var users = [];
        const response = await fetch('api/user/allUsers', {method: 'get'});
        const body = await response.json();
        if (body.users.length > 0) users = body.users;
        if (response.status !== 200) throw Error(body.message);
        await this.setState({ loading: false });
        return users;
    };


    updateTable = async()  => {
         this.getUsers().then((users) => {
            this.setState({
                users: users,
                loading: false
            })
        });

    };

    // Update a single user with a permission type
    updateUser = async (user, type) => {
        fetch ('/api/user/permissions', { method: 'put',
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
       await this.setState({
            loading: true
        });
        this.updateTable();
    };

    renderPromote(user){
        if(this.state.permissions === "Admin" || this.state.permissions === "Superuser"){
            return(
                <Button color="primary" onClick={() => this.updateUser(user, "Admin")}>Promote</Button>
            )
        }
    }

    renderDemote(user){
        if(this.state.permissions === "Superuser"){
            return(
                <Button color="danger" onClick={() => this.updateUser(user, "User")}>Demote</Button>
            )
        }
    }



    render() {
        if (this.state.loading === false){
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
                                                {this.renderPromote(user)}
                                            </div>
                                            <div className="col-6">
                                                {this.renderDemote(user)}
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
        } else{
            return (
                <div>
                    <Alert className="no-users-alert" color="primary">
                        Loading user table.
                    </Alert>
                </div>
            );
        }
    }
}

export default AdminPermission;