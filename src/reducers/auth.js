/**
 * Copyright (c) 2018-Physalix, Fabrice Sommavilla.
 * Licensed under the MIT License (MIT).
 * See https://github.com/flasomm/react-starter-boilerplate
 * @date     22/05/2018
 */

import i18n from 'shared/i18n';
import {AbilityBuilder, Ability} from '@casl/ability';
import {
    IS_LOGIN,
    IS_LOGOUT,
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT
} from 'shared/actions';

/**
 * Define casl abilities for user's role authenticated.
 * @param user
 * @returns {*}
 */
const defineAbilitiesFor = (user) => {
    const {rules, can} = AbilityBuilder.extract();

    if (user.role === 'admin') {
        can('manage', 'all');
    } else {
        can('read', 'all');
    }
    return new Ability(rules);
};

const INITIAL_STATE = {
    user: {},
    ability: {},
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
            return {...state, isAuthenticated: true, user: action.payload, ability: defineAbilitiesFor(action.payload)};

        case IS_LOGOUT:
            return {...state, isAuthenticated: false, user: {}, ability: {}};

        case LOGIN:
            return {...state, isAuthenticated: false, isError: false};

        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                isError: false,
                user: action.payload,
                ability: defineAbilitiesFor(action.payload),
                message: i18n(action.type, action.status)
            };

        case LOGIN_FAILURE:
            return {
                ...state,
                isAuthenticated: false,
                user: {},
                ability: {},
                isError: true,
                message: i18n(action.type, action.status)
            };

        case LOGOUT:
            return {...state, isAuthenticated: false, isError: false, message: i18n(action.type, action.status)};

        default:
            return state;
    }
}
