/**
 * This program belongs to Physalix.
 * It is considered a trade secret, and is not to be divulged or used
 * by parties who have not received written authorization from the owner.
 * For more details please contact us on fs@physalix.com
 *
 * @author   Fabrice Sommavilla <fs@physalix.com>
 * @company  Physalix
 * @version  0.1
 * @date     03/06/2018
 */

import {
    GET_USER
} from 'shared/actions';

const config = require('config');

export function get(userId) {
    return {
        type: GET_USER,
        promise: fetch(`${config.api.host}:${config.api.port}/user/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem('jwt')}`
            },
            mode: 'cors',
            cache: 'default'
        })
    };
}
