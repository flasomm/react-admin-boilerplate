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
import {helpers} from 'utils/index';
import {users} from 'actions/index';
import {RemoteDataTable} from 'components/index';

const config = require('config');

/**
 * Users page class.
 */
class Users extends Component {
    static propTypes = {
        data: PropTypes.array,
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
            data: props.data || [],
            totalUsers: props.totalUsers,
            page: 1,
            sizePerPage: 10
        };
    }

    componentDidMount() {
        this.props.getAll(((this.state.page - 1) * this.state.sizePerPage), this.state.sizePerPage);
    }

    formatDatetime(cell) {
        return (
            <span>{helpers.formatIsoDate(cell)}</span>
        );
    }

    onTableChange(type, {filters}) {
        console.log('type', type);
        console.log('page', this.state.page);
        console.log('sizePerPage', this.state.sizePerPage);
        console.log('filters', filters);
        const currentIndex = (this.state.page - 1) * this.state.sizePerPage;
        console.log('currentIndex', currentIndex);
    }

    render() {
        const columns = [{
            dataField: '_id',
            text: 'UID'
        }, {
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
        }];

        const defaultSorted = [{
            dataField: 'createdAt',
            order: 'desc'
        }];

        const {data, totalUsers} = this.props;

        return (
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
                            <RemoteDataTable data={ data }
                                             columns={ columns }
                                             defaultSorted={ defaultSorted }
                                             page={ this.state.page }
                                             sizePerPage={ this.state.sizePerPage }
                                             totalSize={ totalUsers }
                                             onTableChange={ this.onTableChange.bind(this) }
                            />
                        </Panel.Body>
                    </Panel>
                </Row>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => ({
    data: state.users.items,
    totalUsers: state.users.totalUsers
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getAll: (skip, limit) => users.getAll(skip, limit)
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Users);
