/**
 * @author   Fabrice Sommavilla <fs@physalix.com>
 * @company  Physalix
 * @version  0.1
 * @date     22/05/2018
 */

import React, {Component} from 'react';
import {Route, Switch} from 'react-router';
import {PrivateRoute, PublicRoute} from 'components/index';
import {Dashboard} from 'containers/Dashboard';
import {Login} from 'containers/Login';
import {NotFound} from 'containers/NotFound';

export default () => {
    return (
        <Switch>
            <PublicRoute path="/" component={Login} exact={true} />
            <PrivateRoute path="/dashboard" component={Dashboard} exact={true} />
            <Route component={NotFound} />
        </Switch>
    );
};
