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
        console.log(this.props);
        return(
            <div className='profile-container'>
             <Modal isOpen={this.state.modal} toggle={this.toggleChangePassword}>
                <ModalHeader toggle={this.toggleChangePassword}>Change Password</ModalHeader>
                <form id='passwordForm' action='/api/user/editPassword' method='post'>
                    <ModalBody>
                            <input id='currPass' name='currPass' type='password' className='form-control' placeholder='Current Password'/>
                            <input id='newPass' name='newPass' type='password' className='form-control' placeholder='New Password'/>
                    </ModalBody>
                    <ModalFooter>
                            <Button type='submit' color="primary" className="primary-themed-btn" >Change Password</Button>{' '}
                            <Button type='button' color="secondary" onClick={this.toggleChangePassword}>Cancel</Button>
                    </ModalFooter>
                </form>
             </Modal>
                <div id='profile'>
                    <form id='profileForm' action='/api/user/editProfile/'method='post'>
                        <div className='profile-info mb-3'>
                        <div className='form-group'>
                            <input id='email' name='email' type='email' className='form-control' placeholder={this.props.email}/>
                        </div>
                        <div className='form-group'>
                            <input id='phone' name='phone' type='text' className='form-control' placeholder={this.props.phone}/>
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