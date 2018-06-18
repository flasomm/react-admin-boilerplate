/**
 * @author   Fabrice Sommavilla <fs@physalix.com>
 * @company  Physalix
 * @version  0.1
 * @date     22/05/2018
 */

import React from 'react';
import {Route, Switch} from 'react-router';
import {PrivateRoute, PublicRoute} from 'components/index';
import {Dashboard, Login, NotFound, Profile} from 'containers/index';

export default () => (
    <Switch>
        <PublicRoute path="/" component={Login} exact={true}/>
        <PrivateRoute path="/dashboard" component={Dashboard} exact={true}/>
        <PrivateRoute path="/profile" component={Profile} exact={true}/>
        <Route component={NotFound}/>
    </Switch>
);
