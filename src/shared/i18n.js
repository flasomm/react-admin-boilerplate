/**
 * @author   Fabrice Sommavilla <fs@physalix.com>
 * @company  Physalix
 * @version  0.1
 * @date     22/05/2018
 */


const messages = {
    LOGIN_SUCCESS: {
        200: 'Authentication successful'
    },
    LOGIN_FAILURE: {
        400: 'Error Server',
        401: 'Access denied'
    },
    LOGOUT: {
        200: 'Logout successful'
    },
    REQUEST_DENIED: {
        401: 'Unauthorized'
    }
};

export default (type, status) => messages[type][status];
