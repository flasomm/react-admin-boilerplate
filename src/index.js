/**
 * Copyright (c) 2018-Physalix, Fabrice Sommavilla.
 * Licensed under the MIT License (MIT).
 * See https://github.com/flasomm/react-starter-boilerplate
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
import 'bootstrap/dist/js/bootstrap.min';
import 'font-awesome/css/font-awesome.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-toastr/src/components/demo.css';
import 'assets/css/animate.css';
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
