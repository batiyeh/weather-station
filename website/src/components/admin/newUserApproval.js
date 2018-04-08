import React, { Component } from 'react';
import { Table, Alert, Button } from 'reactstrap';

class NewUserApproval extends Component {
    constructor() {
        super();
        this.state = {
            pendingUsers: [],
            loading: true
        }

        this.updateUser = this.updateUser.bind(this);

    };

    componentDidMount(){
        this.getPendingUsers().then((pendingUsers) => {
            this.setState({ 
                pendingUsers: pendingUsers, 
                loading: false 
            })
        });
    }

    getPendingUsers = async () => {
        var pendingUsers = [];
        const response = await fetch('api/user/pendingUsers', {method: 'get'});
        const body = await response.json();
        if (body.pendingUsers.length > 0) pendingUsers = body.pendingUsers;
        if (response.status !== 200) throw Error(body.message);
        return pendingUsers;
    };

    updateTable(){
        this.getPendingUsers();
    };

    // approveUser = async ()=> {
    //     await this.setState({
    //         statusP: true
    //     })
    //     this.updateUser()
    //     this.getuser()
    // }

    // denyUser = async ()=> {
    //     await this.setState({
    //         statusP: false
    //     })
    //     this.updateUser()
    //     this.getuser()
    // }

    updateUser = async () => {
        await fetch ('/api/user/approveUser', { method: 'post', 
            body: JSON.stringify({
                selectedUser: this.state.selectedUser, 
                statusP: this.state.statusP
            }),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            credentials:'include'}
        );
    }

    renderAlert(){
        if (this.state.pendingUsers.length === 0){
            return (
                <tr>
                    <td colSpan="2">
                        <Alert className="no-users-alert" color="primary">
                            There are no pending users to display.
                        </Alert>
                    </td>
                </tr>
            );
        }
    }

    render() {
        if (this.state.loading === true){
            return null;
        } else{
            return(
                <Table className="admin-table" bordered>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.pendingUsers.map((user) => {
                                return (
                                    <tr>
                                        <td className="admin-table-username">
                                            { user["username"] }
                                        </td>
                                        <td className="admin-table-buttons">
                                            <div className="row">                                          
                                                <div className="col-6">
                                                    <Button color="primary" onClick={() => this.updateUser(user, "approve")}>Approve</Button>
                                                </div>
                                                <div className="col-6">
                                                    <Button color="danger" onClick={() => this.updateUser(user, "approve")}>Deny</Button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        }
                        { this.renderAlert() }
                    </tbody>
                </Table>
            );
        }
    }
}

export default NewUserApproval;