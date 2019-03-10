
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
    },
    UPDATE_USER: {
        200: 'User updated with success',
        404: 'User not found'
    },
    CREATE_USER: {
        200: 'User created with success',
        404: 'User not found'
    },
    DELETE_USER: {
        200: 'User deleted with success',
        404: 'User not found'
    },
    UPDATE_ROLE: {
        200: 'Role updated with success',
        404: 'Role not found'
    },
    CREATE_ROLE: {
        200: 'Role created with success',
        404: 'Role not found'
    },
    DELETE_ROLE: {
        200: 'Role deleted with success',
        404: 'Role not found'
    }
};

export default (type, status) => messages[type][status];
