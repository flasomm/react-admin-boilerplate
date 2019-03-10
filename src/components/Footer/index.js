import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Grid, Row} from 'react-bootstrap';
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
                    <Row className={styles['footer-content']}>
                        <Link to="/">
                            <span>© {new Date().getFullYear()} {config.app.title}.</span>
                        </Link>
                    </Row>
                </Grid>
            </footer>
        );
    }
}

export default Header;
