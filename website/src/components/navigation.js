import React, { Component } from 'react';
import '../styles/navbar.css';
import logo from '../images/dod_logo.png';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink } from 'reactstrap';

class Navigation extends Component {
    render() {
        return (
            <div>
                <Navbar className="react-nav" color="faded" light expand="md">
                    <NavbarBrand href="/">
                        <img src={logo} width="30" height="30" alt=""></img>
                    </NavbarBrand>
                    <Nav>
                        <NavItem>
                            <NavLink href="/stations/">stations</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/forecast/">forecast</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/map/">map</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/historical/">historical</NavLink>
                        </NavItem>
                    </Nav>
                </Navbar>
            </div>
        );
  }
}

export default Navigation;