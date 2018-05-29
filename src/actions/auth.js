/**
 * @author   Fabrice Sommavilla <fs@physalix.com>
 * @company  Physalix
 * @version  0.1
 * @date     22/05/2018
 */

import jwt from 'jsonwebtoken';
import {AbilityBuilder, Ability} from '@casl/ability';
import {
    LOGIN,
    LOGOUT,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    IS_LOGIN,
    IS_LOGOUT
} from 'shared/actions';

const config = require('config');

const decodeToken = (token) => {
    const decodedToken = jwt.decode(token);
    return {
        id: decodedToken['_id'],
        email: decodedToken.email,
        role: decodedToken.role
    };
};

const loginSuccess = (user) => ({
    type: LOGIN_SUCCESS,
    payload: user,
    status: 200
});

const loginFailure = (status) => ({
    type: LOGIN_FAILURE,
    status: status
});

const loginRequest = () => ({
    type: LOGIN
});

const isLoggedInSuccess = (user) => ({
    type: IS_LOGIN,
    payload: user
});

const isLoggedInFailure = () => ({
    type: IS_LOGOUT
});

export const isLoggedIn = () => (dispatch) => {
    const token = sessionStorage.getItem('jwt');
    if (token) {
        dispatch(isLoggedInSuccess(decodeToken(token)));
    } else {
        dispatch(isLoggedInFailure());
    }
};

const defineAbilitiesFor = (user) => {
    const {rules, can, cannot} = AbilityBuilder.extract();

    if (user.role === 'admin') {
        can('manage', 'all');
    } else {
        cannot('manage', 'all');
        can('read', 'all');
    }

    return new Ability(rules);
};

export const login = (email, password) => dispatch => new Promise(resolve => {
    dispatch(loginRequest());

    fetch(`${config.api.host}:${config.api.port}/signin`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify({
            email,
            password
        })
    })
        .then(response => {
            if (response.status !== 200) {
                dispatch(loginFailure(response.status));
                return;
            }
            response.json().then(value => {
                sessionStorage.setItem('jwt', value.token);
                const user = decodeToken(value.token);
                defineAbilitiesFor(user);
                dispatch(loginSuccess(user));
                resolve(value);
            });
        });
});

export const logout = () => {
    sessionStorage.clear();
    return {
        type: LOGOUT,
        status: 200
    };
};

