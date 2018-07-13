/**
 * Copyright (c) 2018-Physalix, Fabrice Sommavilla.
 * Licensed under the MIT License (MIT).
 * See https://github.com/flasomm/react-starter-boilerplate
 * @date     13/07/2018
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import queryString from 'query-string';
import {Grid, Row, Panel} from 'react-bootstrap';
import {UserForm} from 'components/index';
import {users} from 'actions/index';

/**
 * User page class.
 */
class User extends Component {
    static propTypes = {
        user: PropTypes.object,
        location: PropTypes.object,
        get: PropTypes.func,
        save: PropTypes.func
    };

    /**
     * Default constructor.
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            user: props.user || {},
            formHasChanged: false
        };
    }

    componentDidMount() {
        console.log(this.props.location);
        const params = queryString.parse(this.props.location.search);
        this.props.get(params.id);
    }

    /**
     * Handle change on field form.
     * @param event
     */
    handleChange(event) {
        const state = {...this.state};
        state['user'][event.target.name] = event.target.value;
        state['formHasChanged'] = true;
        this.setState(state);
    }

    /**
     * Handle change on submit form.
     * @param e
     */
    onSubmit(e) {
        e.preventDefault();
        this.props.save(this.state.user);
        this.setState({formHasChanged: false});
    }

    render() {
        const title = `${this.state.user.firstname} ${this.state.user.lastname}`;
        return (
            <Grid fluid className="main-padding">
                <Helmet title={`User - ${title}`}/>
                <Row>
                    <Panel>
                        <Panel.Heading>
                            <Panel.Title>
                                <i className="fa fa-user fa-fw"></i>
                                <span>&nbsp;User {title}</span>
                            </Panel.Title>
                        </Panel.Heading>
                        <Panel.Body>
                            <UserForm user={this.state.user}
                                      handleChange={this.handleChange}
                                      formHasChanged={this.state.formHasChanged}
                                      onSubmit={this.onSubmit}/>
                        </Panel.Body>
                    </Panel>
                </Row>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.users.item
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    get: (id) => users.get(id),
    save: (state) => users.update(state)
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(User);
