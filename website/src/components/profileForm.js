import React, { Component } from 'react';
import { Input, Button, Card, CardText, CardTitle, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
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
                <ModalBody>
                    <form id='passwordForm' action='/api/user/editPassword' method='post'>
                        <input id='currPass' name='currPass' type='password' className='form-control' placeholder='Current Password'/>
                        <input id='newPass' name='newPass' type='password' className='form-control' placeholder='New Password'/>
                    </form>
                </ModalBody>
                <ModalFooter>
                        <Button color="primary" className="primary-themed-btn" type='submit'>Change Password</Button>{' '}
                        <Button color="secondary" onClick={this.toggleChangePassword}>Cancel</Button>
                </ModalFooter>
             </Modal>
                <div id='profile'>
                    <form id='profileForm' action='/api/user/editProfile/'method='post'>
                        <div className='profile-info mb-3'>
                        <div className='form-group'>
                            <input id='email' name='email' type='email' className='form-control' placeholder='Email'/>
                        </div>
                        <div className='form-group'>
                            <input id='phone' name='phone' type='text' className='form-control' placeholder='Phone Number'/>
                        </div>
                        </div>
                        <div className='row'>
                            <div className='col-6'>
                                <button type='button' color='primary' className="btn btn-default btn-block profile-btn" onClick={this.toggleChangePassword}>Change Password</button>
                                <button type='submit' className='btn btn-default btn-block profile-btn'>Save Changes</button>
                            </div>
                            
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default ProfileForm;