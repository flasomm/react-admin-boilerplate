/**
 * Copyright (c) 2018-Physalix, Fabrice Sommavilla.
 * Licensed under the MIT License (MIT).
 * See https://github.com/flasomm/react-starter-boilerplate
 * @date  30/06/2018
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import {Grid, Row, Panel} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {helpers} from 'utils/index';
import {users} from 'actions/index';
import {RemoteDataTable, Breadcrumbs} from 'components/index';

const config = require('config');

/**
 * Users page class.
 */
class Users extends Component {
    static propTypes = {
        users: PropTypes.array,
        totalUsers: PropTypes.number,
        getAll: PropTypes.func
    };

    /**
     * Default constructor.
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            totalUsers: 0,
            page: 1,
            sizePerPage: 10,
            loading: false,
            type: ''
        };
    }

    formatDatetime(cell) {
        return (
            <span>{helpers.formatIsoDate(cell)}</span>
        );
    }

    displayActions(cell) {
        return (
            <Link to={`/users/${cell}`}
                  className="btn btn-primary btn-xs"
                  role="button"
                  aria-disabled="true">Show
            </Link>
        );
    }

    onTableChange(type, {page = 1, sizePerPage = 10}) {
        const currentIndex = (page - 1) * sizePerPage;
        this.props.getAll(currentIndex, sizePerPage);
        setTimeout(() => {
            this.setState(() => ({
                page,
                users: this.props.users,
                totalSize: this.props.totalUsers,
                sizePerPage,
                loading: false,
                type: type
            }));
        }, 1000);
        this.setState(() => ({loading: true}));
    }

    render() {
        const columns = [{
            dataField: 'firstname',
            text: 'Firstname',
            sort: true
        }, {
            dataField: 'lastname',
            text: 'Lastname',
            sort: true
        }, {
            dataField: 'email',
            text: 'Email',
            sort: true
        }, {
            dataField: 'role',
            text: 'Role',
            sort: true
        }, {
            dataField: 'updatedAt',
            text: 'Updated At',
            sort: true,
            formatter: this.formatDatetime
        }, {
            dataField: 'createdAt',
            text: 'Created At',
            sort: true,
            formatter: this.formatDatetime
        }, {
            dataField: '_id',
            text: '',
            formatter: this.displayActions
        }];

        const defaultSorted = [{
            dataField: 'createdAt',
            order: 'desc'
        }];

        return (
            <div>
                <Breadcrumbs />
                <Grid fluid className="main-padding">
                    <Helmet title={`Users - ${config.app.title}`}/>
                    <Row>
                        <Panel>
                            <Panel.Heading>
                                <Panel.Title>
                                    <i className="fa fa-users fa-fw"></i>
                                    <span>&nbsp;Users</span>
                                </Panel.Title>
                            </Panel.Heading>
                            <Panel.Body>
                                <RemoteDataTable data={ this.props.users }
                                                 loading={ this.state.loading }
                                                 columns={ columns }
                                                 defaultSorted={ defaultSorted }
                                                 page={ this.state.page }
                                                 sizePerPage={ this.state.sizePerPage }
                                                 totalSize={ this.props.totalUsers }
                                                 onTableChange={ this.onTableChange.bind(this) }
                                />
                            </Panel.Body>
                        </Panel>
                    </Row>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    users: state.users.items,
    totalUsers: state.users.totalUsers
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getAll: (skip, limit) => users.getAll(skip, limit)
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Users);
