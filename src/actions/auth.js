/**
 * @author   Fabrice Sommavilla <fs@physalix.com>
 * @company  Physalix
 * @version  0.1
 * @date     22/05/2018
 */

import jwt from 'jsonwebtoken';
import {
    LOGIN,
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
    payload: user
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
        console.log('authentication successfull');
        dispatch(isLoggedInSuccess(decodeToken(token)));
    } else {
        console.log('not logged in ');
        dispatch(isLoggedInFailure());
    }
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
                dispatch(loginSuccess(decodeToken(value.token)));
                resolve(value);
            });
        });
});

/*
 const logout = () => {
 sessionStorage.clear();
 return {
 type: LOGOUT
 };
 };
 */
