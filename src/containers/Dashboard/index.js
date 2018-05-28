/**
 * @author   Fabrice Sommavilla <fs@physalix.com>
 * @company  Physalix
 * @version  0.1
 * @date     22/05/2018
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Grid, Col, Row} from 'react-bootstrap';
import Helmet from 'react-helmet';

const config = require('config');

/**
 * Dashboard page class.
 */
class Dashboard extends Component {
    /**
     * Render.
     * @returns {XML}
     */
    render() {
        return (
            <Grid fluid>
                <Row>
                    <Col lg={4} md={8}>
                        <Helmet title={`Dashboard - ${config.app.title}`}/>
                        <div>Dashboard</div>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => ({
    ...state
});

export default connect(mapStateToProps)(Dashboard);
