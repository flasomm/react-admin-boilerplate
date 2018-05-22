/**
 * @author   Fabrice Sommavilla <fs@physalix.com>
 * @company  Physalix
 * @version  0.1
 * @date     22/05/2018
 */

import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import configureStore from 'store/configureStore';
import {App} from 'containers/App';
import routes from './routes';
import 'assets/css/styles.css';

require('es6-promise').polyfill();
require('isomorphic-fetch');

const history = createHistory();
const store = configureStore(history);

ReactDOM.render((
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App>
                {routes()}
            </App>
        </ConnectedRouter>
    </Provider>
), document.getElementById('root'));
