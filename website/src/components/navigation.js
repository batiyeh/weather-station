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
    DropdownItem,
    Card } from 'reactstrap';

class Navigation extends Component {
    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this);
        this.toggleAlert = this.toggleAlert.bind(this);
        this.renderAlerts = this.renderAlerts.bind(this);

        this.state = {
            dropdownOpen: false,
            alertDropDown: false,
            redirect: false,
            alerts: [],
        }
    }
    componentWillMount = async () => {
        await this.getWebpageAlerts();
    }

    getWebpageAlerts = async () => {
        var alerts = [];

        var response = await fetch('/api/alerts/webpage', {method: 'post', credentials: 'include'})
        var body = await response.json();
        alerts = body.alerts;

        this.setState({alerts: alerts});
        this.state.alerts.map(alerts => {
            console.log(alerts);
        })
    }

    toggle(){
        this.setState({
            dropdownOpen:!this.state.dropdownOpen
        })
    }
    toggleAlert(){
        this.setState({
            alertDropDown: !this.state.alertDropDown
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
    renderAlerts(){
        var webpageAlertCards = [];
        this.state.alerts.map(alerts =>{
            webpageAlertCards.push(<DropdownItem><Card>Alert from: {alerts.station_name}</Card></DropdownItem>)
        })
        console.log(webpageAlertCards);
        return webpageAlertCards;
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
                        <Nav className='ml-auto' navbar>
                            <Dropdown isOpen={this.state.alertDropDown} toggle={this.toggleAlert} nav inNavbar>
                                <DropdownToggle nav caret>
                                img here
                                </DropdownToggle>
                                <DropdownMenu className="alert-menu" right>
                                    {this.renderAlerts()}
                                </DropdownMenu>
                            </Dropdown>
                        </Nav>
                        <Nav className="ml-auto" navbar>
                            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} nav inNavbar>
                                <DropdownToggle nav caret>
                                {this.props.username}
                                </DropdownToggle>
                                <DropdownMenu className="user-menu" right>
                                    <DropdownItem tag='a'>
                                        <Link to={'/profile'} className='nav-link nav-link-dark'>profile</Link>
                                    </DropdownItem>
                                    <DropdownItem tag='a'>
                                        <Link to={'/admin'} className='nav-link nav-link-dark'>admin</Link>
                                    </DropdownItem>
                                    <DropdownItem tag='a'>
                                        <Link to={'/alerts'} className='nav-link nav-link-dark'>alerts</Link>
                                    </DropdownItem>
                                    <DropdownItem tag='a'>
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