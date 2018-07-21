/**
 * Copyright (c) 2018-Physalix, Fabrice Sommavilla.
 * Licensed under the MIT License (MIT).
 * See https://github.com/flasomm/react-starter-boilerplate
 * @date     13/07/2018
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Form, FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap';

class UserForm extends Component {
    static propTypes = {
        user: PropTypes.object,
        handleChange: PropTypes.func,
        onSubmit: PropTypes.func,
        formHasChanged: PropTypes.bool
    };

    render() {
        const {user, handleChange, formHasChanged, onSubmit} = this.props;
        return (
            <Form>
                <FormGroup controlId="firstname">
                    <ControlLabel>Firstname</ControlLabel>
                    <span className="required">*</span>
                    <FormControl id="firstname"
                                 name="firstname"
                                 type="text"
                                 label="Firstname"
                                 required="required"
                                 value={user.firstname || ''}
                                 placeholder="Your Firstname"
                                 onChange={handleChange}
                    />
                </FormGroup>

                <FormGroup controlId="lastname">
                    <ControlLabel>Lastname</ControlLabel>
                    <span className="required">*</span>
                    <FormControl id="lastname"
                                 name="lastname"
                                 type="text"
                                 label="Lastname"
                                 required="required"
                                 value={user.lastname || ''}
                                 placeholder="Your Lastname"
                                 onChange={handleChange}
                    />
                </FormGroup>

                <FormGroup controlId="email">
                    <ControlLabel>Email</ControlLabel>
                    <span className="required">*</span>
                    <FormControl id="email"
                                 name="email"
                                 type="email"
                                 label="Email"
                                 value={user.email || ''}
                                 required="required"
                                 placeholder="Your Email"
                                 onChange={handleChange}
                    />
                </FormGroup>

                <FormGroup controlId="role">
                    <ControlLabel>Role</ControlLabel>
                    <span className="required">*</span>
                    <FormControl id="role"
                                 name="role"
                                 type="text"
                                 label="Role"
                                 value={user.role || ''}
                                 required="required"
                                 placeholder="Your Role"
                                 onChange={handleChange}
                    />
                </FormGroup>
                <Button bsStyle="primary" disabled={!formHasChanged} onClick={onSubmit}>Save</Button>
            </Form>
        );
    }
}

export default UserForm;
