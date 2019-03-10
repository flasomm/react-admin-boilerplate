import {
    GET_USER,
    UPDATE_USER,
    CREATE_USER,
    DELETE_USER,
    NEW_USER,
    GET_ALL_USERS
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
export default function users(state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_ALL_USERS:
            return {...state, items: action.payload.users, total: action.payload.total};

        case GET_USER:
            return {...state, item: action.payload};

        case UPDATE_USER:
            return {...state, item: action.payload};

        case CREATE_USER:
            return {...state, item: action.payload};

        case NEW_USER:
            return {...state, item: {_id: undefined, email: '', role: '', firstname: '', lastname: ''}};

        case DELETE_USER:
            const newState = {...state};
            newState.items = state.items.filter(user => !action.payload.includes(user._id));
            return {...newState};

        default:
            return state;
    }
}
