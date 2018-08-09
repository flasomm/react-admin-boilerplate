/**
 * Copyright (c) 2018-Physalix, Fabrice Sommavilla.
 * Licensed under the MIT License (MIT).
 * See https://github.com/flasomm/react-starter-boilerplate
 * @date  26/07/2018
 */

import {
    NEW_ROLE,
    GET_ROLE,
    UPDATE_ROLE,
    CREATE_ROLE,
    DELETE_ROLE,
    GET_ALL_ROLES
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
export default function roles(state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_ALL_ROLES:
            return {...state, items: action.payload.roles, total: action.payload.total};

        case GET_ROLE:
            return {...state, item: action.payload};

        case UPDATE_ROLE:
            return {...state, item: action.payload};

        case CREATE_ROLE:
            return {...state, item: action.payload};

        case NEW_ROLE:
            return {...state, item: {_id: undefined, role: '', resource: '', action: '', attributes: '*'}};

        case DELETE_ROLE:
            return {...state, item: action.payload};

        default:
            return state;
    }
}
