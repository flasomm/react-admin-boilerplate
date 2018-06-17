/**
 * @author   Fabrice Sommavilla <fs@physalix.com>
 * @company  Physalix
 * @version  0.1
 * @date     29/05/2018
 */

import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {Navbar, Nav, NavDropdown, MenuItem, FormGroup, FormControl} from 'react-bootstrap';
import {auth} from 'actions/index';

const config = require('config');

/**
 * Headers page class.
 */
class Header extends Component {
    static propTypes = {
        isAuthenticated: PropTypes.bool,
        isLoggedIn: PropTypes.func.isRequired,
        logout: PropTypes.func.isRequired
    };

    static defaultProps = {
        isAuthenticated: false
    };

    constructor(props) {
        super(props);
        this.state = {
            title: config.app.title
        };
        if (!props.isAuthenticated) {
            setTimeout(() => {
                props.isLoggedIn();
            }, 5);
        }
    }

    displayMenu() {
        const {isAuthenticated} = this.props;
        if (isAuthenticated) {
            return (
                <div>
                    <Nav pullRight>
                        <NavDropdown eventKey={1} title={<i className="fa fa-user fa-fw"></i>} id="top-menu">
                            <MenuItem eventKey={1.1}>
                                    <span>
                                       <i className="fa fa-user fa-fw"></i> User Profile
                                    </span>
                            </MenuItem>
                            <MenuItem eventKey={1.2}>
                                    <span>
                                      <i className="fa fa-cog fa-fw"></i> Settings
                                    </span>
                            </MenuItem>
                            <MenuItem divider/>
                            <MenuItem eventKey={1.3} onClick={this.props.logout}>
                                    <span>
                                        <i className="fa fa-sign-out-alt fa-fw"></i> Logout
                                    </span>
                            </MenuItem>
                        </NavDropdown>
                    </Nav>
                    <Navbar.Form pullRight>
                        <FormGroup className="search-form">
                            <FormControl type="text" placeholder="Search"/>
                        </FormGroup>
                    </Navbar.Form>
                </div>
            );
        }
        return null;
    }

    render() {
        return (
            <header>
                <Navbar fluid={true}>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <Link to="/">{this.state.title}</Link>
                        </Navbar.Brand>
                        <Navbar.Toggle data-toggle="collapse" data-target="#sidebar"/>
                    </Navbar.Header>
                    {this.displayMenu()}
                </Navbar>
            </header>
        );
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    isLoggedIn: () => auth.isLoggedIn(),
    logout: () => auth.logout()
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Header);
