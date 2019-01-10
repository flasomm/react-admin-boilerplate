/**
 * Copyright (c) 2018-Physalix, Fabrice Sommavilla.
 * Licensed under the MIT License (MIT).
 * See https://github.com/flasomm/react-starter-boilerplate
 * @date  11/09/2018
 */

import {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

class Admin extends Component {
    static propTypes = {
        isLoggedIn: PropTypes.func.isRequired,
        allowedRoles: PropTypes.array,
        authUser: PropTypes.object,
        children: PropTypes.element.isRequired
    };

    render() {
        const {children} = this.props;
        if (this.props.authUser.role === 'admin') {
            return children;
        }
        return null;
    }
}

const mapStateToProps = state => ({
    authUser: state.auth.user
});

export default connect(mapStateToProps)(Admin);
