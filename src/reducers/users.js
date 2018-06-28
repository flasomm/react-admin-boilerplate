/**
 * Copyright (c) 2018-Physalix, Fabrice Sommavilla.
 * Licensed under the MIT License (MIT).
 * See https://github.com/flasomm/react-starter-boilerplate
 * @date     04/06/2018
 */

import {
    GET_USER,
    UPDATE_USER
} from 'shared/actions';

const INITIAL_STATE = {
    item: {},
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
        case GET_USER:
            return {...state, item: action.payload};

        case UPDATE_USER:
            return {...state, item: action.payload};

        default:
            return state;
    }
}
