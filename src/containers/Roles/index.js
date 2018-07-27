/**
 * Copyright (c) 2018-Physalix, Fabrice Sommavilla.
 * Licensed under the MIT License (MIT).
 * See https://github.com/flasomm/react-starter-boilerplate
 * @date  25/07/2018
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import {Grid, Row, Panel} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {helpers} from 'utils/index';
import {roles} from 'actions/index';
import {RemoteDataTable, Breadcrumbs} from 'components/index';

const config = require('config');

/**
 * Roles page class.
 */
class Roles extends Component {
    static propTypes = {
        roles: PropTypes.array,
        total: PropTypes.number,
        getAll: PropTypes.func
    };

    /**
     * Default constructor.
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            roles: [],
            total: 0,
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
            <Link to={`/roles/${cell}`}
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
                roles: this.props.roles,
                totalSize: this.props.total,
                sizePerPage,
                loading: false,
                type: type
            }));
        }, 100);
        this.setState(() => ({loading: true}));
    }

    render() {
        const columns = [{
            dataField: 'role',
            text: 'Role',
            sort: true
        }, {
            dataField: 'resource',
            text: 'Resource',
            sort: true
        }, {
            dataField: 'action',
            text: 'Action',
            sort: true
        }, {
            dataField: 'attributes',
            text: 'Attributes',
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
                    <Helmet title={`Roles - ${config.app.title}`}/>
                    <Row>
                        <Panel>
                            <Panel.Heading>
                                <Panel.Title>
                                    <i className="fa fa-user-circle fa-fw"></i>
                                    <span>&nbsp;Roles</span>
                                </Panel.Title>
                            </Panel.Heading>
                            <Panel.Body>
                                <RemoteDataTable data={ this.props.roles }
                                                 loading={ this.state.loading }
                                                 columns={ columns }
                                                 defaultSorted={ defaultSorted }
                                                 page={ this.state.page }
                                                 sizePerPage={ this.state.sizePerPage }
                                                 totalSize={ this.props.total }
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
    roles: state.roles.items,
    total: state.roles.total
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getAll: (skip, limit) => roles.getAll(skip, limit)
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Roles);
