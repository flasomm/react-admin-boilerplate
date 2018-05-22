/**
 * @author   Fabrice Sommavilla <fs@physalix.com>
 * @company  Physalix
 * @version  0.1
 * @date     22/05/2018
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Route, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';

import AuthMiddleware from 'modules/auth/middleware';

class PublicRoute extends Component {
    static propTypes = {
        component: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool,
        isLoggedIn: PropTypes.func.isRequired
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

    componentWillMount() {
        if (this.props.isAuthenticated) {
            console.log('authenticated');
        } else {
            console.log('not authenticated');
        }
    }

    renderRoute() {
        if (!this.props.isAuthenticated) {
            React.createElement(this.props.component, this.props);
        } else {
            return <Redirect to={{ pathname: '/',  state: { from: this.props.location } }}/>
        }
    }

    render() {
        return (
            <Route {...this.props.rest} render={this.renderRoute}/>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        isLoggedIn: () => AuthMiddleware.isLoggedIn()
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(PublicRoute);