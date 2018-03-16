
import React, { Component } from 'react';
import '../styles/navbar.css';
import logo from '../images/space-satellite-dish-512x512.png';
import { Link, Redirect} from 'react-router-dom';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Card,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Form,
    Button,
    Alert } from 'reactstrap';
    
var FontAwesome = require('react-fontawesome')

class Navigation extends Component {
    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this);
        this.toggleAlert = this.toggleAlert.bind(this);
        this.toggleAlertModal = this.toggleAlertModal.bind(this);
        this.renderAlerts = this.renderAlerts.bind(this);
        this.renderHeader = this.renderHeader.bind(this);

        this.state = {
            dropdownOpen: false,
            alertDropDown: false,
            redirect: false,
            alerts: [],
            modal: false,
            temperature: null,
            pressure: null,
            humidity: null,
            time: null,
            station_name: null,
            keyword: null,
            type: null,
            value1: null,
            value2: null,
            unread: false,
        }
    }
    componentDidMount = async () => {
        await this.getWebpageAlerts();
    }

    getWebpageAlerts = async () => {
        var alerts = [];

        var response = await fetch('/api/alerts/webpage', {method: 'post', credentials: 'include'})
        var body = await response.json();
        alerts = body.alerts;

        //check for unread here
        var unread = false;
        await alerts.map(alerts=>{
            console.log(alerts);
            if(alerts.read === 0){
                unread = true;
            }
        })
        console.log(unread);
        this.setState({alerts: alerts, unread: unread});
        
    }

    toggle(){

        this.setState({
            dropdownOpen:!this.state.dropdownOpen
        })
    }
    toggleAlert = async () => {
        fetch('/api/alerts/read', {method: 'post', credentials: 'include'})
        console.log('after fetch');
        this.setState({
            unread: false,
            alertDropDown: !this.state.alertDropDown
        })
    }
    toggleAlertModal(station_name, type, keyword, value1, value2, temperature, pressure, humidity, time){
        this.setState({
            station_name: station_name,
            type : type,
            keyword: keyword,
            value1: value1,
            value2: value2,
            temperature: temperature,
            pressure: pressure,
            humidity: humidity,
            time: time,
            modal: !this.state.modal
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
    renderBell(){
        if(this.state.unread){
            return(<FontAwesome className='unread-bell' size='2x' name='bell'/>
        )
        }
        else{
            return(<FontAwesome className='bell' size='2x' name='bell'/>)
        }
    }
    renderHeader(){
        if(this.state.value2){
            return(<ModalHeader toggle={this.toggleAlertModal}> {this.state.station_name}'s {this.state.type} is {this.state.keyword} {this.state.value1} and {this.state.value2} </ModalHeader>)
        }
        else{
            return(<ModalHeader toggle={this.toggleAlertModal}> {this.state.station_name}'s {this.state.type} is {this.state.keyword} {this.state.value1} </ModalHeader>)
        }
    }
    renderAlerts(){
        var webpageAlertCards = [];
        var nextIndex = null;
        var value1 = null;
        this.state.alerts.map((alerts, index) =>{
            if(alerts.keyword === 'between'){
                if(nextIndex != index){
                    value1 = alerts.value;
                    nextIndex = index + 1;
                }
                else{
                    webpageAlertCards.push(<DropdownItem  onClick={() => this.toggleAlertModal(alerts.station_name, alerts.type, alerts.keyword, value1, alerts.value, alerts.temperature, alerts.pressure, alerts.humidity, alerts.triggered_at)}>
                    <Card>Alert: {alerts.station_name}'s {alerts.type} is {alerts.keyword} {value1} and {alerts.value}</Card></DropdownItem>)
                }
            }
            else{
                webpageAlertCards.push(<DropdownItem onClick={() => this.toggleAlertModal(alerts.station_name, alerts.type, alerts.keyword, alerts.value, null, alerts.temperature, alerts.pressure, alerts.humidity, alerts.triggered_at)}>
                <Card>Alert: {alerts.station_name}'s {alerts.type} is {alerts.keyword} {alerts.value}</Card></DropdownItem>)
            }
        })
        if(webpageAlertCards.length === 0){
            return(<Alert>You have no alerts</Alert>)
        }
        else{
            return webpageAlertCards;
        }
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
                                    {this.renderBell()}
                                </DropdownToggle>
                                <DropdownMenu className="user-menu" right>
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
                        <Modal isOpen={this.state.modal} toggle={this.toggleAlertModal}>
                            {this.renderHeader()}
                            <Form id='AlertForm'>
                                <ModalBody>
                                    <p>Weather Data for {this.state.station_name} at {this.state.time}:</p>
                                    <p>Temperature: {this.state.temperature}</p>
                                    <p>Pressure: {this.state.pressure}</p>
                                    Humidity: {this.state.humidity}
                                </ModalBody>
                                <ModalFooter>
                                    <Button type='button' color="secondary" onClick={this.dismissAlert}>Dismiss</Button>
                                </ModalFooter>
                            </Form>
                        </Modal>   
                    </Navbar>
                </div>
            );
        }
  }
}

export default Navigation;