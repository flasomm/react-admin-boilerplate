/**
 * Copyright (c) 2018-Physalix, Fabrice Sommavilla.
 * Licensed under the MIT License (MIT).
 * See https://github.com/flasomm/react-starter-boilerplate
 * @date     22/05/2018
 */

import jwt from 'jsonwebtoken';
import {
    LOGIN,
    LOGOUT,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    IS_LOGIN,
    IS_LOGOUT
} from 'shared/actions';

const config = require('config');

const tokenHasExpired = token => {
    const decodedToken = jwt.decode(token);
    const currentTime = new Date().getTime() / 1000;
    return currentTime > decodedToken.exp;
};

const loginSuccess = user => ({
    type: LOGIN_SUCCESS,
    payload: user,
    status: 200
});

const loginFailure = status => ({
    type: LOGIN_FAILURE,
    status: status
});

const loginRequest = () => ({
    type: LOGIN
});

const isLoggedInSuccess = user => ({
    type: IS_LOGIN,
    payload: user
});

const isLoggedInFailure = () => ({
    type: IS_LOGOUT
});

export const isLoggedIn = () => dispatch => {
    const token = sessionStorage.getItem('jwt');
    if (token && !tokenHasExpired(token)) {
        dispatch(isLoggedInSuccess(jwt.decode(token)));
    } else {
        dispatch(isLoggedInFailure());
    }
};

export const login = (email, password) => dispatch => new Promise(resolve => {
    dispatch(loginRequest());

    fetch(`${config.api.url}/signin`, {
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
                const token = jwt.decode(value.token);
                dispatch(loginSuccess(token));
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
