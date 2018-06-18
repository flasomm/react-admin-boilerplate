/**
 * Copyright (c) 2018-Physalix, Fabrice Sommavilla.
 * Licensed under the MIT License (MIT).
 * See https://github.com/flasomm/react-starter-boilerplate
 * @date  18/06/2018
 */

import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Grid} from 'react-bootstrap';
import styles from './styles.css';

const config = require('config');

/**
 * Headers page class.
 */
class Header extends Component {
    render() {
        return (
            <footer className={`${styles.footer} navbar-fixed-bottom`}>
                <Grid fluid>
                    <div className={`row ${styles['footer-content']}`}>
                        <Link to="/">
                            <span>© {new Date().getFullYear()} {config.app.title}.</span>
                        </Link>
                    </div>
                </Grid>
            </footer>
        );
    }
}

export default Header;
