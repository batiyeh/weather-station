import React, { Component } from 'react';
import '../styles/navbar.css';
import logo from '../images/space-satellite-dish-512x512.png';
import { Link, Redirect } from 'react-router-dom';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';

class Navigation extends Component {
    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false,
            redirect: false
        }
    }

    toggle(){
        this.setState({
            dropdownOpen:!this.state.dropdownOpen
        })
    }

    logout = async() => {
        var response = await fetch('/api/user/logout', {method: 'post', credentials: 'include'})
        var body = await response.json();
        this.setState({
            redirect: true
        })
        return body;
    }

    render() {
        if(this.state.redirect) {
            return <Redirect to='/user/login'/>;
        }

        else{
            return (
                <div>
                    <Navbar className="react-nav" color="faded" light expand="md">
                        <NavbarBrand href="/">
                            <Link to={'/'} className='nav-link'><img src={logo} width="30" height="30" alt=""></img></Link>
                        </NavbarBrand>
                        <Nav>
                            <NavItem>
                                <Link to={'/'} className='nav-link'>stations</Link>
                            </NavItem>
                            <NavItem>
                                <Link to={'/map'} className='nav-link'>map</Link>
                            </NavItem>
                            <NavItem>
                                <Link to={'/historical'} className='nav-link'>historical</Link>
                            </NavItem>
                        </Nav>
                        <Nav className="ml-auto" navbar>
                            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} nav inNavbar>
                                <DropdownToggle nav caret>
                                username
                                </DropdownToggle>
                                <DropdownMenu className="user-menu" right>
                                    <DropdownItem>
                                        <Link to={'/profile'} className='nav-link nav-link-dark'>profile</Link>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <Link to={'/alerts'} className='nav-link nav-link-dark'>alerts</Link>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <a onClick={this.logout} className='nav-link nav-link-dark'>logout</a>
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </Nav>
                    </Navbar>
                </div>
            );
        }
  }
}

export default Navigation;