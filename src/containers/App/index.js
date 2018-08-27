/**
 * Copyright (c) 2018-Physalix, Fabrice Sommavilla.
 * Licensed under the MIT License (MIT).
 * See https://github.com/flasomm/react-starter-boilerplate
 * @date     22/05/2018
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Header, Footer, Loading, Menu, Notification} from 'components/index';
import styles from './styles.css';

/**
 * App page class.
 */
export default class App extends Component {
    static propTypes = {
        children: PropTypes.node
    };

    render() {
        return (
            <div id={styles['main-wrapper']}>
                <Notification />
                <Loading />
                <Header />
                <div className={styles['app-body']}>
                    <Menu />
                    <div className={styles.main}>
                        {this.props.children}
                        <Footer />
                    </div>
                </div>
            </div>
        );
    }
}
