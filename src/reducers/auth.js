/**
 * Copyright (c) 2018-Physalix, Fabrice Sommavilla.
 * Licensed under the MIT License (MIT).
 * See https://github.com/flasomm/react-starter-boilerplate
 * @date     22/05/2018
 */

import i18n from 'shared/i18n';
import {
    IS_LOGIN,
    IS_LOGOUT,
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT
} from 'shared/actions';

const INITIAL_STATE = {
    user: {},
    roles: [],
    isAuthenticated: null,
    isError: false,
    message: ''
};

/**
 * Default function.
 * @param state
 * @param action
 * @returns {*}
 */
export default function auth(state = INITIAL_STATE, action) {
    switch (action.type) {
        case IS_LOGIN:
            return {...state, isAuthenticated: true, user: action.payload, roles: action.payload};

        case IS_LOGOUT:
            return {...state, isAuthenticated: false, user: {}, roles: []};

        case LOGIN:
            return {...state, isAuthenticated: false, isError: false};

        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                isError: false,
                user: action.payload,
                roles: action.payload,
                message: i18n(action.type, action.status)
            };

        case LOGIN_FAILURE:
            return {
                ...state,
                isAuthenticated: false,
                user: {},
                roles: [],
                isError: true,
                message: i18n(action.type, action.status)
            };

        case LOGOUT:
            return {...state, isAuthenticated: false, isError: false, message: i18n(action.type, action.status)};

        default:
            return state;
    }
}
