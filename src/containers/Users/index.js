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

    priceFormatter(cell, row) {
        return (
            <span>{cell}</span>
        );
    }

    render() {
        const columns = [{
            dataField: '_id',
            text: 'UID'
        }, {
            dataField: 'firstname',
            text: 'Firstname'
        }, {
            dataField: 'lastname',
            text: 'Lastname'
        }, {
            dataField: 'email',
            text: 'Email'
        }, {
            dataField: 'role',
            text: 'Role'
        }, {
            dataField: 'updatedAt',
            text: 'Updated At',
            formatter: priceFormatter
        }, {
            dataField: 'createdAt',
            text: 'Created At',
            formatter: priceFormatter
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
                            <BootstrapTable keyField='_id' data={ this.props.users } columns={ columns } bordered={ false } striped
                                            hover/>
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
