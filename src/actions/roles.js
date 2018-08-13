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

const config = require('config');

export const add = () => ({
    type: NEW_ROLE
});

export const getAll = (skip, limit) => ({
    type: GET_ALL_ROLES,
    promise: fetch(`${config.api.url}/roles?skip=${skip}&limit=${limit}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('jwt')}`
        },
        mode: 'cors',
        cache: 'default'
    })
});

export const get = (roleId) => ({
    type: GET_ROLE,
    promise: fetch(`${config.api.url}/roles/${roleId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('jwt')}`
        },
        mode: 'cors',
        cache: 'default'
    })
});

export const update = (role) => ({
    type: UPDATE_ROLE,
    promise: fetch(`${config.api.url}/roles/${role._id}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('jwt')}`
        },
        body: JSON.stringify(role)
    })
});

export const create = (role) => ({
    type: CREATE_ROLE,
    promise: fetch(`${config.api.url}/roles`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('jwt')}`
        },
        body: JSON.stringify(role)
    })
});

export const remove = (role) => ({
    type: DELETE_ROLE,
    promise: fetch(`${config.api.url}/roles/${role[0]}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('jwt')}`
        },
        body: JSON.stringify(role)
    })
});
