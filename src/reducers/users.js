/**
 * This program belongs to Physalix.
 * It is considered a trade secret, and is not to be divulged or used
 * by parties who have not received written authorization from the owner.
 * For more details please contact us on fs@physalix.com
 *
 * @author   Fabrice Sommavilla <fs@physalix.com>
 * @company  Physalix
 * @version  0.1
 * @date     04/06/2018
 */

import {
    GET_USER
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

        default:
            return state;
    }
}
