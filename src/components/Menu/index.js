/**
 * Copyright (c) 2018-Physalix, Fabrice Sommavilla.
 * Licensed under the MIT License (MIT).
 * See https://github.com/flasomm/react-starter-boilerplate
 * @date     10/06/2018
 */

import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {auth} from 'actions/index';
import styles from './styles.css';

/**
 * App page class.
 */
class Menu extends Component {
    static propTypes = {
        isAuthenticated: PropTypes.bool,
        isLoggedIn: PropTypes.func.isRequired,
        pathname: PropTypes.string.isRequired
    };

    static defaultProps = {
        isAuthenticated: false
    };

    constructor(props) {
        super(props);
        if (!props.isAuthenticated) {
            setTimeout(() => {
                props.isLoggedIn();
            }, 5);
        }
    }

    render() {
        if (!this.props.isAuthenticated) {
            return null;
        }
        return (
            <div className={`navbar-collapse collapse ${styles.sidebar}`} id="sidebar">
                <nav>
                    <ul className={styles.navigation}>
                        <li>
                            <NavLink to="/dashboard"
                                     activeClassName="selected"
                                     exact
                                     strict
                                     activeStyle={{
                                        fontWeight: 'bold',
                                        backgroundColor: '#fff'
                                    }}>
                                <i className="fa fa-tachometer fa-fw"></i>
                                <span>&nbsp;Dashboard</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/users"
                                     activeClassName="selected"
                                     strict
                                     activeStyle={{
                                        fontWeight: 'bold',
                                        backgroundColor: '#fff'
                                    }}>
                                <i className="fa fa-users fa-fw"></i>
                                <span>&nbsp;Users</span>
                            </NavLink>
                        </li>
                        <li>
                            <input type="checkbox" name="group-1" id="group-1"/>
                            <label htmlFor="group-1">
                                <i className="fa fa-cog fa-fw"></i>
                                <span>&nbsp;System</span>
                            </label>
                            <ul>
                                <li>
                                    <NavLink to="/roles"
                                             activeClassName="selected"
                                             strict
                                             activeStyle={{
                                                fontWeight: 'bold',
                                                backgroundColor: '#fff'
                                            }}>
                                        <i className="fa fa-user-circle fa-fw"></i>
                                        <span>&nbsp;Roles</span>
                                    </NavLink>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    pathname: state.routing.location.pathname
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    isLoggedIn: () => auth.isLoggedIn()
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
