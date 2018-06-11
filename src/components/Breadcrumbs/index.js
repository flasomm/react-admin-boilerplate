/**
 * Copyright (c) 2018-Physalix, Fabrice Sommavilla.
 * Licensed under the MIT License (MIT).
 * See https://github.com/flasomm/react-starter-boilerplate
 * @date  12/06/2018
 */

import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {auth} from 'actions/index';


class Breadcrumbs extends Component {
    static propTypes = {
        isAuthenticated: PropTypes.bool,
        isLoggedIn: PropTypes.func.isRequired,
        location: PropTypes.object
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

    displayCrumbs() {
        const {isAuthenticated, location} = this.props;
        const name = `${location.pathname.substr(1).charAt(0).toUpperCase()}${location.pathname.substr(1).slice(1)}`;
        if (isAuthenticated) {
            return (
                <ol className="breadcrumb">
                    <li className="active breadcrumb-item" aria-current="page">
                        <NavLink to={location.pathname} activeClassName="selected">{name}</NavLink>
                    </li>
                </ol>
            );
        }
        return null;
    }

    render() {
        return (
            <nav className="" aria-label="breadcrumb">{this.displayCrumbs()}</nav>
        );
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    location: state.routing.location
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    isLoggedIn: () => auth.isLoggedIn()
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Breadcrumbs);
