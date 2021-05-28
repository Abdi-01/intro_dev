import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText,
    Button
} from 'reactstrap';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logoutAction } from '../actions'

class NavbarComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        }
    }

    toggle = () => {
        this.setState({ isOpen: !this.state.isOpen })
    }

    render() {
        return (
            <div>
                <div>
                    <Navbar color="light" light expand="md">
                        <Link to="/" className="navbar-brand">PhotoGraph</Link>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="mr-auto" navbar>
                                <NavItem>
                                    <NavLink href="/components/">Components</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
                                </NavItem>
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle nav caret>
                                        Options
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                        <DropdownItem>
                                            Option 1
                                        </DropdownItem>
                                        <DropdownItem>
                                            Option 2
                                        </DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem>
                                            Reset
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </Nav>
                            {
                                this.props.username ?
                                    <UncontrolledDropdown>
                                        <DropdownToggle outline color="info" caret style={{ fontWeight: 'bold' }}>
                                            Welcome, {this.props.username}
                                        </DropdownToggle>
                                        <DropdownMenu right>
                                            <DropdownItem>
                                                Option 1
                                            </DropdownItem>
                                            <DropdownItem>
                                                Option 2
                                            </DropdownItem>
                                            <DropdownItem divider />
                                            <DropdownItem onClick={this.props.logoutAction}>
                                                Sign Out
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown> :
                                    <>
                                        <Link to="/login" className="btn btn-primary btn-sm">Sign In</Link>
                                        <Link to="/register" className="btn btn-outline-info btn-sm">Register</Link>
                                    </>
                            }
                        </Collapse>
                    </Navbar>
                </div>
            </div>
        );
    }
}

const mapToProps = (state) => {
    return {
        username: state.userReducer.username
    }
}

export default connect(mapToProps, { logoutAction })(NavbarComp);