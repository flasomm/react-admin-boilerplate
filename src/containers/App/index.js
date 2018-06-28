/**
 * Copyright (c) 2018-Physalix, Fabrice Sommavilla.
 * Licensed under the MIT License (MIT).
 * See https://github.com/flasomm/react-starter-boilerplate
 * @date     22/05/2018
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Header, Footer, Menu, Breadcrumbs} from 'components/index';
import styles from './styles.css';

class App extends Component {
    static propTypes = {
        children: PropTypes.node
    };

    render() {
        return (
            <div id={styles['main-wrapper']}>
                <Header />
                <div className={styles['app-body']}>
                    <Menu />
                    <div className={styles.main}>
                        <Breadcrumbs />
                        {this.props.children}
                        <Footer />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
