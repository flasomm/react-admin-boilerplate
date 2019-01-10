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
import styles from './styles.css';

/**
 * Breadcrumbs page class.
 */
class Breadcrumbs extends Component {
    static propTypes = {
        isLoggedIn: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool,
        location: PropTypes.object,
        title: PropTypes.string
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
        const {isAuthenticated, location, title} = this.props;
        const path = location.pathname.split('/')[1];
        const section = `${path.charAt(0).toUpperCase()}${path.substr(1)}`;
        if (isAuthenticated) {
            return (
                <nav aria-label="breadcrumb">
                    <ol className={styles.breadcrumb}>
                        <li className={styles['breadcrumb-item']}>
                            <NavLink to="/" activeClassName="selected">Home</NavLink>
                        </li>
                        <li className={`${styles.active} ${styles['breadcrumb-item']}`} aria-current="page">
                            { (title) ? <NavLink to={`/${path}`} activeClassName="selected">{section}</NavLink> : section }
                        </li>
                        { (title) ?
                            <li className={`${styles.active} ${styles['breadcrumb-item']}`} aria-current="page">{title}</li> : ''
                        }
                    </ol>
                </nav>
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

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    location: state.routing.location
});

const mapDispatchToProps = dispatch => bindActionCreators({
    isLoggedIn: () => auth.isLoggedIn()
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Breadcrumbs);
