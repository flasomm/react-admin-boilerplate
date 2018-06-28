/**
 * Copyright (c) 2018-Physalix, Fabrice Sommavilla.
 * Licensed under the MIT License (MIT).
 * See https://github.com/flasomm/react-starter-boilerplate
 * @date     03/06/2018
 */

import {
    GET_USER,
    UPDATE_USER
} from 'shared/actions';

const config = require('config');

export const get = (userId) => ({
    type: GET_USER,
    promise: fetch(`${config.api.url}/users/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('jwt')}`
        },
        mode: 'cors',
        cache: 'default'
    })
});

export const update = (user) => ({
    type: UPDATE_USER,
    promise: fetch(`${config.api.url}/users/${user.id}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('jwt')}`
        },
        body: JSON.stringify(user)
    })
});
