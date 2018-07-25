/**
 * Copyright (c) 2018-Physalix, Fabrice Sommavilla.
 * Licensed under the MIT License (MIT).
 * See https://github.com/flasomm/react-starter-boilerplate
 * @date     22/05/2018
 */

import {
    REQUEST_FAILURE,
    REQUEST_WARNING,
    REQUEST_NOT_FOUND,
    REQUEST_DUPLICATE,
    REQUEST_SUCCEED,
    REQUEST_DENIED,
    LOADING,
    END_LOADING
} from 'shared/actions';

function notify(type, message) {
    if (type && message) {
        return '';
    }
    return {
        id: parseInt(Math.random() * 1000, 10),
        title: type.charAt(0).toUpperCase() + type.slice(1),
        status: type,
        message
    };
}

const INITIAL_STATE = {
    toasterMsg: null,
    loading: false
};

export default function app(state = INITIAL_STATE, action) {
    switch (action.type) {
        case REQUEST_DENIED:
            return {...action.state, auth: {isAuthenticated: false, user: {}}};

        case REQUEST_NOT_FOUND:
            return {toasterMsg: notify('info', action.message)};

        case REQUEST_DUPLICATE:
            return {toasterMsg: notify('info', action.message)};

        case REQUEST_WARNING:
            return {toasterMsg: notify('warning', action.message)};

        case REQUEST_FAILURE:
            return {toasterMsg: notify('error', action.message)};

        case REQUEST_SUCCEED:
            return {toasterMsg: notify('success', action.message)};

        case LOADING:
            return {loading: true};

        case END_LOADING:
            return {loading: false};

        default:
            return state;
    }
}
