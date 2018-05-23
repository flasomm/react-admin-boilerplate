/**
 * @author   Fabrice Sommavilla <fs@physalix.com>
 * @company  Physalix
 * @version  0.1
 * @date     22/05/2018
 */

import {
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT
} from 'shared/actions';

const config = require('config');

export default class Auth {
    loginSuccess(res) {
        return {
            value: res,
            type: LOGIN_SUCCESS
        };
    }

    loginFailure(status) {
        return {
            type: LOGIN_FAILURE,
            status: status
        };
    }

    loginRequest() {
        return {
            type: LOGIN
        };
    }

    static isLoggedIn() {
        return !!sessionStorage.getItem('jwt');
    }

    static login(email, password) {
        return dispatch => new Promise(resolve => {
            dispatch(this.loginRequest());

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
                        dispatch(this.loginFailure(response.status));
                        return;
                    }
                    response.json().then(value => {
                        dispatch(this.loginSuccess(value));
                        resolve(value);
                    });
                });
        });
    }

    static logout() {
        sessionStorage.clear();
        return {
            type: LOGOUT
        };
    }
}
