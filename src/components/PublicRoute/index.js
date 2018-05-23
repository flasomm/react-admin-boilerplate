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
import {Auth} from 'actions/index';

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

    render() {
        const {isAuthenticated, component, ...rest} = this.props;
        if (isAuthenticated !== null) {
            return (
                <Route
                    {...rest}
                    render={props => (
            !isAuthenticated ? (
              React.createElement(component, props)
            ) : (
              <Redirect
                to={{
                  pathname: '/dashboard',
                  state: { from: props.location }
                }}
              />
            )
          )}
                />
            );
        }
        return null;
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        isLoggedIn: () => Auth.isLoggedIn()
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PublicRoute);
