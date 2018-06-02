/**
 * @author   Fabrice Sommavilla <fs@physalix.com>
 * @company  Physalix
 * @version  0.1
 * @date     22/05/2018
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {Grid, Col, Row} from 'react-bootstrap';
import {Can} from '@casl/react';
import Helmet from 'react-helmet';
import {auth} from 'actions/index';

const config = require('config');

/**
 * Dashboard page class.
 */
class Dashboard extends Component {
    static propTypes = {
        ability: PropTypes.object
    };

    createUser() {
        console.log('test create');
    }

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
                        <Can I="create" a="User" ability={this.props.ability}>
                            <button onClick={this.createUser.bind(this)}>Create User</button>
                        </Can>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => ({
    ability: state.auth.ability
});

const mapDispatchToProps = (dispatch) => ({
    authActions: bindActionCreators(auth, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
