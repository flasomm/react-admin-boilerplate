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
        save: PropTypes.func
    };

    /**
     * Default constructor.
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            id: props.user.id,
            email: props.user.email,
            firstname: props.user.firstname,
            lastname: props.user.lastname
        };
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    /**
     * Handle change on field form.
     * @param event
     */
    handleChange(event) {
        const state = {...this.state};
        state[event.target.name] = event.target.value;
        this.setState(state);
    }

    /**
     * Handle change on submit form.
     * @param e
     */
    onSubmit(e) {
        e.preventDefault();
        this.props.save(this.state);
    }

    /**
     * Render
     * @returns {XML}
     */
    render() {
        const title = `Profile: ${this.state.firstname || ''} ${this.state.lastname || ''}`;
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
                                    type="text"
                                    label="Firstname"
                                    required="required"
                                    value={this.state.firstname || ''}
                                    placeholder="Your Firstname"
                                    onChange={this.handleChange}
                                />
                                <FieldGroup
                                    id="lastname"
                                    type="text"
                                    label="Lastname"
                                    required="required"
                                    value={this.state.lastname || ''}
                                    placeholder="Your Lastname"
                                    onChange={this.handleChange}
                                />
                                <FieldGroup
                                    id="email"
                                    type="text"
                                    label="Email"
                                    value={this.state.email || ''}
                                    required="required"
                                    placeholder="Your Email"
                                    onChange={this.handleChange}
                                />
                                <FieldGroup
                                    id="role"
                                    type="role"
                                    disabled
                                    label="Role"
                                    value={this.props.user.role || ''}
                                    placeholder="Role"
                                />
                            </Form>
                            <Button bsStyle="primary" onClick={this.onSubmit}>
                            </Button>
                        </Panel.Body>
                    </Panel>
                </Row>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.auth.user
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    save: () => users.update()
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
