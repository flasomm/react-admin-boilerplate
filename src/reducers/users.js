/**
 * Copyright (c) 2018-Physalix, Fabrice Sommavilla.
 * Licensed under the MIT License (MIT).
 * See https://github.com/flasomm/react-starter-boilerplate
 * @date     04/06/2018
 */

import {
    GET_USER,
    UPDATE_USER,
    GET_ALL_USERS
} from 'shared/actions';

const INITIAL_STATE = {
    item: {},
    items: [],
    total: 0,
    isError: false,
    message: ''
};

/**
 * Default function.
 * @param state
 * @param action
 * @returns {*}
 */
export default function users(state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_ALL_USERS:
            return {...state, items: action.payload.users, total: action.payload.total};

        case GET_USER:
            return {...state, item: action.payload};

        case UPDATE_USER:
            return {...state, item: action.payload};

        default:
            return state;
    }
}
