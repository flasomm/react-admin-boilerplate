/**
 * @author   Fabrice Sommavilla <fs@physalix.com>
 * @company  Physalix
 * @version  0.1
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
            return {...state, isAuthenticated: true, user: action.payload};

        case IS_LOGOUT:
            return {...state, isAuthenticated: false, user: {}};

        case LOGIN:
            return {...state, isAuthenticated: false, isError: false};

        case LOGIN_SUCCESS:
            return {
                ...state, isAuthenticated: true, isError: false, user: action.payload, message: i18n(action.type, action.status)
            };

        case LOGIN_FAILURE:
            return {...state, isAuthenticated: false, user: {}, isError: true, message: i18n(action.type, action.status)};

        case LOGOUT:
            return {...state, isAuthenticated: false, isError: false, message: i18n(action.type, action.status)};

        default:
            return state;
    }
}
