/**
 * Copyright (c) 2018-Physalix, Fabrice Sommavilla.
 * Licensed under the MIT License (MIT).
 * See https://github.com/flasomm/react-starter-boilerplate
 * @date     22/05/2018
 */

import {createStore, applyMiddleware, combineReducers} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import {routerReducer, routerMiddleware} from 'react-router-redux';
import loggerMiddleware from 'redux-logger';
import promiseMiddleware from 'middleware/promiseMiddleware';
import * as reducers from 'reducers/index';

/**
 * Creates a preconfigured store.
 */
export default function configureStore(history, initialState) {
    // create reducer from custom reducers and our router
    const reducer = combineReducers({...reducers.default, routing: routerReducer});
    // Build the middleware for intercepting and dispatching navigation actions
    const routesMiddleware = routerMiddleware(history);
    // create the store with thunk and promise middleware
    const createStoreWithMiddleware = composeWithDevTools(
        applyMiddleware(routesMiddleware, thunkMiddleware, loggerMiddleware, promiseMiddleware)
    )(createStore);

    return createStoreWithMiddleware(reducer, initialState);
}
