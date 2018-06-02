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
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'assets/css/styles.css';
import {App} from 'containers/index';
import routes from './routes';

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
