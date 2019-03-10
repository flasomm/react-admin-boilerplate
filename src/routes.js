import React from 'react';
import {Route, Switch} from 'react-router';
import {PrivateRoute, PublicRoute} from 'components/index';
import {Dashboard, Login, NotFound, Profile, Role, Roles, User, Users} from 'containers/index';

export default () => (
    <Switch>
        <PublicRoute path="/" component={Login} exact={true}/>
        <PrivateRoute path="/dashboard" component={Dashboard} exact={true}/>
        <PrivateRoute path="/profile" component={Profile} exact={true}/>
        <PrivateRoute path="/roles" component={Roles} exact={true}/>
        <PrivateRoute path="/roles/:id" component={Role} exact={true}/>
        <PrivateRoute path="/users" component={Users} exact={true}/>
        <PrivateRoute path="/users/:id" component={User} exact={true}/>
        <Route component={NotFound}/>
    </Switch>
);
