import React, { Component } from 'react';
import '../styles/navbar.css';
import logo from '../images/space-satellite-dish-512x512.png';
import { Link } from 'react-router-dom';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem } from 'reactstrap';

class Navigation extends Component {
    render() {
        return (
            <div>
                <Navbar className="react-nav" color="faded" light expand="md">
                    <NavbarBrand href="/">
                        <Link to={'/stations'} className='nav-link'><img src={logo} width="30" height="30" alt=""></img></Link>
                    </NavbarBrand>
                    <Nav>
                        <NavItem>
                            <Link to={'/stations'} className='nav-link'>stations</Link>
                        </NavItem>
                        <NavItem>
                            <Link to={'/forecast'} className='nav-link'>forecast</Link>
                        </NavItem>
                        <NavItem>
                            <Link to={'/map'} className='nav-link'>map</Link>
                        </NavItem>
                        <NavItem>
                            <Link to={'/historical'} className='nav-link'>historical</Link>
                        </NavItem>
                    </Nav>
                </Navbar>
            </div>
        );
  }
}

export default Navigation;