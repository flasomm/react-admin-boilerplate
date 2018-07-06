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
import BootstrapTable from 'react-bootstrap-table-next';
import {helpers} from 'utils/index';
import {users} from 'actions/index';

const config = require('config');

/**
 * Users page class.
 */
class Users extends Component {
    static propTypes = {
        users: PropTypes.array,
        getAll: PropTypes.func
    };

    /**
     * Default constructor.
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            users: props.users || []
        };
    }

    componentDidMount() {
        this.props.getAll();
    }

    formatDatetime(cell) {
        return (
            <span>{helpers.formatIsoDate(cell)}</span>
        );
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
            sort: true,
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
                            <BootstrapTable keyField='_id'
                                            data={ this.props.users }
                                            columns={ columns }
                                            defaultSorted={ defaultSorted }
                                            bordered={ false }
                                            striped
                                            hover
                            />
                        </Panel.Body>
                    </Panel>

                </Row>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => ({
    users: state.users.items
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getAll: () => users.getAll()
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Users);
