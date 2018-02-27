import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import '../styles/profile.css';

class ProfileForm extends Component {
    constructor(props){
        super(props);
        this.state={
            modal: false
        }
        
        this.toggleChangePassword = this.toggleChangePassword.bind(this);
    }
    toggleChangePassword(){
        this.setState({
            modal: !this.state.modal
        })
    }

    render(){
        return(
            <div className='profile-container'>
             <Modal isOpen={this.state.modal} toggle={this.toggleChangePassword}>
                <ModalHeader toggle={this.toggleChangePassword}>Change Password</ModalHeader>
                <form id='passwordForm' action='/api/user/editPassword' method='post'>
                    <ModalBody>
                        <div className='form-group'>
                            <input id='currPass' name='currPass' type='password' className='form-control' placeholder='Current Password'/>
                        </div>
                        <div className='form-group'>
                            <input id='newPass' name='newPass' type='password' className='form-control' placeholder='New Password'/>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                            <Button type='submit' color="primary" className="primary-themed-btn" >Change Password</Button>{' '}
                            <Button type='button' color="secondary" onClick={this.toggleChangePassword}>Cancel</Button>
                    </ModalFooter>
                </form>
             </Modal>
                <div id='profile'>
                    <h2 className="page-title">User Profile</h2>
                    <form id='profileForm' action='/api/user/editProfile/'method='post'>
                        <div className='profile-info mb-3'>
                            <div className='row'>
                                <label for="username" class="col-sm-4 col-form-label">Username</label>
                                <div class="form-group col-sm-8">
                                    <input id='username' name='username' type='username' className='form-control' placeholder={this.props.username} disabled/>
                                </div>
                            </div>
                            <div className='row'>
                                <label for="email" class="col-sm-4 col-form-label">Email</label>
                                <div class="form-group col-sm-8">
                                    <input id='email' name='email' type='email' className='form-control' placeholder={this.props.email}/>
                                </div>
                            </div>
                            <div className='row'>
                                <label for="phone" class="col-sm-4 col-form-label">Phone</label>
                                <div class="form-group col-sm-8">
                                    <input id='phone' name='phone' type='text' className='form-control' placeholder={this.props.phone}/>
                                </div>
                            </div>
                            <div className='row'>
                                <label for="phone" class="col-sm-4 col-form-label">Password</label>
                                <div class="form-group col-sm-8">
                                    <button type='button' className="btn btn-secondary btn-block profile-btn" onClick={this.toggleChangePassword}>Change</button>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-12'>
                                <button type='submit' className='btn btn-primary btn-block profile-btn'>Save Changes</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default ProfileForm;