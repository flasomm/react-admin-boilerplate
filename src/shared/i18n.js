/**
 * @author   Fabrice Sommavilla <fs@physalix.com>
 * @company  Physalix
 * @version  0.1
 * @date     22/05/2018
 */


const messages = {
    CREATE_USER: {
        200: 'User created with success',
        404: 'User not found'
    },
    LOGIN_SUCCESS: {
        200: 'Authentication successful'
    },
    LOGIN_FAILURE: {
        400: 'Error Server',
        401: 'Access denied'
    }
};

export default (type, status) => messages[type][status];
