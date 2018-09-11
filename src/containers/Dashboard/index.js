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
import {Breadcrumbs, Can} from 'components/index';
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
                        <Col lg={3} md={3}>
                            <Panel>
                                <Panel.Body>
                                    <Can I="create" a="user">
                                        <div className={styles['card-content']}>I can create a User</div>
                                    </Can>
                                    <Can I="read" a="user">
                                        <div className={styles['card-content']}>I can read a User</div>
                                    </Can>
                                    <Can I="update" a="user">
                                        <div className={styles['card-content']}>I can update a User</div>
                                    </Can>
                                    <Can I="delete" a="user">
                                        <div className={styles['card-content']}>I can delete a User</div>
                                    </Can>
                                    <Can I="create" a="role">
                                        <div className={styles['card-content']}>I can create a Role</div>
                                    </Can>
                                    <Can I="read" a="role">
                                        <div className={styles['card-content']}>I can read a Role</div>
                                    </Can>
                                    <Can I="update" a="role">
                                        <div className={styles['card-content']}>I can update a Role</div>
                                    </Can>
                                    <Can I="delete" a="role">
                                        <div className={styles['card-content']}>I can delete a Role</div>
                                    </Can>
                                </Panel.Body>
                            </Panel>
                        </Col>
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
                    </Row>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    totalUsers: state.users.total,
    totalRoles: state.roles.total
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getAllUsers: (skip, limit, sortField, sortOrder, searchText) => users.getAll(skip, limit, sortField, sortOrder, searchText),
    getAllRoles: (skip, limit, sortField, sortOrder, searchText) => roles.getAll(skip, limit, sortField, sortOrder, searchText)
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
