/**
 * Copyright (c) 2018-Physalix, Fabrice Sommavilla.
 * Licensed under the MIT License (MIT).
 * See https://github.com/flasomm/react-starter-boilerplate
 * @date     22/05/2018
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {Grid, Col, Row, Panel} from 'react-bootstrap';
import Helmet from 'react-helmet';
import {users, roles} from 'actions/index';
import {Breadcrumbs, Admin} from 'components/index';
import styles from './styles.css';

const config = require('config');

/**
 * Dashboard page class.
 */
class Dashboard extends Component {
    static propTypes = {
        totalUsers: PropTypes.number,
        totalRoles: PropTypes.number,
        getAllUsers: PropTypes.func,
        getAllRoles: PropTypes.func
    };

    componentDidMount() {
        this.props.getAllUsers(0, 1);
        this.props.getAllRoles(0, 1);
    }

    /**
     * Render.
     * @returns {XML}
     */
    render() {
        return (
            <div>
                <Breadcrumbs />
                <Grid fluid>
                    <Helmet title={`Dashboard - ${config.app.title}`}/>
                    <Row className="show-grid">
                        <Admin>
                            <Col lg={3} md={3}>
                                <Panel>
                                    <Panel.Body>
                                        <h1 className={styles['card-h1']}>{this.props.totalUsers}</h1>
                                        <div className={styles['card-content']}>New Users</div>
                                    </Panel.Body>
                                </Panel>
                            </Col>
                            <Col lg={3} md={3}>
                                <Panel>
                                    <Panel.Body>
                                        <h1 className={styles['card-h1']}>{this.props.totalRoles}</h1>
                                        <div className={styles['card-content']}>New Roles</div>
                                    </Panel.Body>
                                </Panel>
                            </Col>
                        </Admin>
                    </Row>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    totalUsers: state.users.total,
    totalRoles: state.roles.total
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getAllUsers: (skip, limit, sortField, sortOrder, searchText) => users.getAll(skip, limit, sortField, sortOrder, searchText),
    getAllRoles: (skip, limit, sortField, sortOrder, searchText) => roles.getAll(skip, limit, sortField, sortOrder, searchText)
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
