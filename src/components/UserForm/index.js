import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Form, FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap';
import Select from 'react-select';

class UserForm extends Component {
    static propTypes = {
        user: PropTypes.object,
        handleChange: PropTypes.func,
        handleChangeSelectRole: PropTypes.func,
        onSubmit: PropTypes.func,
        formHasChanged: PropTypes.bool
    };

    render() {
        const {user, handleChange, handleChangeSelectRole, formHasChanged, onSubmit} = this.props;
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
                    <Select name="role"
                            value={{
                                value: user.role || '',
                                label: user.role || ''
                            }}
                            onChange={handleChangeSelectRole}
                            required={true}
                            options={[
                                {value: 'anonymous', label: 'anonymous'},
                                {value: 'subscriber', label: 'subscriber'},
                                {value: 'admin', label: 'admin'}
                            ]}
                    />
                </FormGroup>
                <Button bsStyle="primary" disabled={!formHasChanged} onClick={onSubmit}>Save</Button>
            </Form>
        );
    }
}

export default UserForm;
