import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Navbar as NavbarBS, Container, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem} from 'reactstrap';


class Navbar extends Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    collapseNavbar = (event) => {
        this.setState({
            isOpen: false
        });
    }

    render(){
        return (
            <header id="header">
        	    <NavbarBS className="navbar navbar-expand-lg navbar-dark bg-amzn">
                    <Container>
                        <NavbarBrand href="/">
                            Getting<span className="text-amzn-orange">To</span>Know<span className="text-amzn-orange">AWS</span>
                        </NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="mr-auto" navbar>
                                <NavItem onClick={this.collapseNavbar}>
                                    <NavLink to="/" exact activeClassName="active" className="nav-item nav-link">Home <span className="sr-only">(current)</span></NavLink>
                                </NavItem>
                                <NavItem onClick={this.collapseNavbar}>
                                    <NavLink to="/comments" activeClassName="active" className="nav-item nav-link">Comments</NavLink>
                                </NavItem>
                                <NavItem>
                                    <a className="nav-item nav-link disabled">Pricing</a>
                                </NavItem>
                            </Nav>
                            <NavbarAuthenticationElement currentUser={this.props.currentUser} handleAppUserSignOut={this.props.handleAppUserSignOut} collapseNavbar={this.collapseNavbar}/>
                        </Collapse>
                    </Container>
                </NavbarBS>
            </header>
        );
    }
}

class NavbarAuthenticationElement extends Component {

    handleSignOut = async (e) => {
        e.preventDefault();
        this.props.collapseNavbar();
        this.props.handleAppUserSignOut();
    }

    render(){
        if(this.props.currentUser!=null){
            return (
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle active" href="##" id="navbarDropdown" 
                            role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Welcome back, {this.props.currentUser.username}
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a href="##" className="dropdown-item" onClick={this.handleSignOut}>Log out</a>
                        </div>
                    </li>
                </ul>
            );
        }
        else {
            return (
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle active" href="##" id="navbarDropdown" 
                            role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Login
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <NavLink to="/login"  className="dropdown-item" onClick={this.props.collapseNavbar}>Login</NavLink>
                            <NavLink to="/signup" className="dropdown-item" onClick={this.props.collapseNavbar}>Sign Up</NavLink>
                        </div>
                    </li>
                </ul>
            );
        }
    }
}

export default Navbar;