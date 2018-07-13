/**
 * Copyright (c) 2018-Physalix, Fabrice Sommavilla.
 * Licensed under the MIT License (MIT).
 * See https://github.com/flasomm/react-starter-boilerplate
 * @date     22/05/2018
 */

import React from 'react';
import {Route, Switch} from 'react-router';
import {PrivateRoute, PublicRoute} from 'components/index';
import {Dashboard, Login, NotFound, Profile, User, Users} from 'containers/index';

export default () => (
    <Switch>
        <PublicRoute path="/" component={Login} exact={true}/>
        <PrivateRoute path="/dashboard" component={Dashboard} exact={true}/>
        <PrivateRoute path="/profile" component={Profile} exact={true}/>
        <PrivateRoute path="/users" component={Users} exact={true}/>
        <PrivateRoute path="/user/:id" component={User} exact={true}/>
        <Route component={NotFound}/>
    </Switch>
);
