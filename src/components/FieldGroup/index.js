/**
 * Copyright (c) 2018-Physalix, Fabrice Sommavilla.
 * Licensed under the MIT License (MIT).
 * See https://github.com/flasomm/react-starter-boilerplate
 * @date  18/06/2018
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap';

/**
 * FieldGroup page class.
 */
class FieldGroup extends Component {
    static propTypes = {
        id: PropTypes.string,
        label: PropTypes.string,
        help: PropTypes.string
    };

    /**
     * Render
     * @returns {XML}
     */
    render() {
        const {id, label, help, ...props} = this.props;
        return (
            <FormGroup controlId={id}>
                <ControlLabel>{label}</ControlLabel>
                {
                    (props.required) ? <span className="required">*</span> : ''
                }
                <FormControl {...props} />
                {help && <HelpBlock>{help}</HelpBlock>}
            </FormGroup>
        );
    }
}

export default FieldGroup;
