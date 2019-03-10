import {
    GET_USER,
    UPDATE_USER,
    CREATE_USER,
    NEW_USER,
    DELETE_USER,
    GET_ALL_USERS
} from 'shared/actions';

const config = require('config');

export const add = () => ({
    type: NEW_USER
});

export const getAll = (skip, limit, sortField, sortOrder, searchText) => {
    const url = `${config.api.url}/users?skip=${skip}&limit=${limit}&sortField=${sortField}&sortOrder=${sortOrder}&q=${searchText}`;
    return {
        type: GET_ALL_USERS,
        promise: fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem('jwt')}`
            },
            mode: 'cors',
            cache: 'default'
        })
    };
};

export const get = userId => ({
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

export const update = user => ({
    type: UPDATE_USER,
    promise: fetch(`${config.api.url}/users/${user._id}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('jwt')}`
        },
        body: JSON.stringify(user)
    })
});

export const create = user => ({
    type: CREATE_USER,
    promise: fetch(`${config.api.url}/users`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('jwt')}`
        },
        body: JSON.stringify(user)
    })
});

export const remove = users => ({
    type: DELETE_USER,
    promise: fetch(`${config.api.url}/users/${users[0]}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('jwt')}`
        },
        body: JSON.stringify(users)
    })
});
