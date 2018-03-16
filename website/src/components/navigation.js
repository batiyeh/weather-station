import React, { Component } from 'react';
import '../styles/navbar.css';
import logo from '../images/space-satellite-dish-512x512.png';
import { Link, Redirect } from 'react-router-dom';
import {
    Navbar,
    NavbarBrand,
    NavbarToggler,
    Collapse,
    Nav,
    NavItem,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';

class Navigation extends Component {
    constructor(props){
        super(props);
        this.state = {
            dropdown: false,
            navShown: false,
            redirect: false
        }
        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.toggleNav = this.toggleNav.bind(this);
    }

    toggleDropdown(){
        this.setState({
            dropdown:!this.state.dropdown
        })
    }

    toggleNav(){
        this.setState({
            navShown:!this.state.navShown
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
                    <Navbar className="react-nav" color="faded" fixed="top" light expand="md">
                        <NavbarBrand href="/">
                            <Link to={'/'} className='nav-link'><img src={logo} width="30" height="30" alt=""></img></Link>
                        </NavbarBrand>
                        <NavbarToggler className="navbar-toggler-container ml-auto" onClick={this.toggleNav} />
                        <Collapse isOpen={this.state.navShown} navbar>
                            <Nav>
                                <div className="col-xs-12 hidden-sm-up">
                                    <NavItem>
                                        <Link to={'/'} className='nav-link'>stations</Link>
                                    </NavItem>
                                </div>
                                <div className="col-xs-12 hidden-sm-up">
                                    <NavItem>
                                        <Link to={'/map'} className='nav-link'>map</Link>
                                    </NavItem>
                                </div>
                                <div className="col-xs-12 hidden-sm-up">
                                    <NavItem>
                                        <Link to={'/historical'} className='nav-link'>historical</Link>
                                    </NavItem>
                                </div>
                            </Nav>
                            <Nav className="ml-auto" navbar>
                                <Dropdown isOpen={this.state.dropdown} toggle={this.toggleDropdown} nav inNavbar>
                                    <DropdownToggle nav caret>
                                    {this.props.username}
                                    </DropdownToggle>
                                    <DropdownMenu className="user-menu" right>
                                        <DropdownItem>
                                            <Link to={'/profile'} className='nav-link nav-link-dark'>profile</Link>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <Link to={'/admin'} className='nav-link nav-link-dark'>admin</Link>
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
                        </Collapse>
                    </Navbar>
                </div>
            );
        }
  }
}

export default Navigation;