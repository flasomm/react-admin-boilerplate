/**
 * Copyright (c) 2018-Physalix, Fabrice Sommavilla.
 * Licensed under the MIT License (MIT).
 * See https://github.com/flasomm/react-starter-boilerplate
 * @date  11/09/2018
 */

import {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {auth, users, roles} from 'actions/index';

class Can extends Component {
    static propTypes = {
        isLoggedIn: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool,
        myRoles: PropTypes.array,
        authUser: PropTypes.object,
        getRolesByName: PropTypes.func,
        get: PropTypes.func,
        I: PropTypes.string.isRequired,
        a: PropTypes.string.isRequired,
        children: PropTypes.element.isRequired
    };

    static defaultProps = {
        isAuthenticated: false
    };

    componentDidMount() {
        this.props.get(this.props.authUser.id);
        this.props.getRolesByName(this.props.authUser.role);
    }

    render() {
        const {myRoles, I, a, children} = this.props;
        if (!myRoles || !myRoles.length) {
            return null;
        }
        const action = I.split(/\s+/);
        const resource = a.split(/\s+/);
        const isAllowed = myRoles.some(role => role.resource.includes(resource) && role.action.includes(action));
        if (!isAllowed) {
            return null;
        }
        return children;
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    myRoles: state.roles.items,
    authUser: state.auth.user
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    isLoggedIn: () => auth.isLoggedIn(),
    getRolesByName: (name) => roles.getRolesByName(name),
    get: (id) => users.get(id)
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(Can);
