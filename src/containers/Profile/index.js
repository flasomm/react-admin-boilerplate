/**
 * Copyright (c) 2018-Physalix, Fabrice Sommavilla.
 * Licensed under the MIT License (MIT).
 * See https://github.com/flasomm/react-starter-boilerplate
 * @date  18/06/2018
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {Grid, Form, Row, Panel, Button} from 'react-bootstrap';
import {FieldGroup} from 'components/index';
import {users} from 'actions/index';

/**
 * Profile page class.
 */
class Profile extends Component {
    static propTypes = {
        user: PropTypes.object,
        authUser: PropTypes.object,
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
            profile: {
                id: props.authUser.id,
                email: props.user.email || '',
                firstname: props.user.firstname || '',
                lastname: props.user.lastname || '',
                role: props.user.role || ''
            },
            formHasChanged: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    static getDerivedStateFromProps(props) {
        return props.user;
    }

    componentDidMount() {
        this.props.get(this.props.authUser.id);
    }

    /**
     * Handle change on field form.
     * @param event
     */
    handleChange(event) {
        const state = {...this.state};
        state['profile'][event.target.name] = event.target.value;
        state['formHasChanged'] = true;
        this.setState(state);
    }

    /**
     * Handle change on submit form.
     * @param e
     */
    onSubmit(e) {
        e.preventDefault();
        this.props.save(this.state.profile);
        this.setState({formHasChanged: false});
    }

    /**
     * Render
     * @returns {XML}
     */
    render() {
        const title = `Profile: ${this.state.profile.firstname} ${this.state.profile.lastname}`;
        return (
            <Grid fluid className="main-padding">
                <Row>
                    <Panel>
                        <Panel.Heading>
                            <Panel.Title componentClass="h3">{title}</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body>
                            <Form>
                                <FieldGroup
                                    id="firstname"
                                    name="firstname"
                                    type="text"
                                    label="Firstname"
                                    required="required"
                                    value={this.state.profile.firstname}
                                    placeholder="Your Firstname"
                                    onChange={this.handleChange}
                                />
                                <FieldGroup
                                    id="lastname"
                                    name="lastname"
                                    type="text"
                                    label="Lastname"
                                    required="required"
                                    value={this.state.profile.lastname}
                                    placeholder="Your Lastname"
                                    onChange={this.handleChange}
                                />
                                <FieldGroup
                                    id="email"
                                    name="email"
                                    type="text"
                                    label="Email"
                                    value={this.state.profile.email}
                                    required="required"
                                    placeholder="Your Email"
                                    onChange={this.handleChange}
                                />
                                <FieldGroup
                                    id="role"
                                    type="role"
                                    name="role"
                                    disabled
                                    label="Role"
                                    value={this.state.profile.role}
                                    placeholder="Role"
                                />
                            </Form>
                            <Button bsStyle="primary" disabled={!this.state.formHasChanged} onClick={this.onSubmit}>Save</Button>
                        </Panel.Body>
                    </Panel>
                </Row>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => ({
    authUser: state.auth.user,
    user: state.users.item
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    get: (id) => users.get(id),
    save: (state) => users.update(state)
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
