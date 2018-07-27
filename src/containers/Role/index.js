/**
 * This program belongs to Physalix.
 * It is considered a trade secret, and is not to be divulged or used
 * by parties who have not received written authorization from the owner.
 *
 * @author   Fabrice Sommavilla <fs@physalix.com>
 * @company  Physalix
 * @version  0.1
 * @date     27/07/2018
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import {Grid, Row, Panel, Form, FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap';
import Select from 'react-select';
import {Breadcrumbs} from 'components/index';
import {roles} from 'actions/index';

/**
 * Role page class.
 */
class Role extends Component {
    static propTypes = {
        role: PropTypes.object,
        location: PropTypes.object,
        get: PropTypes.func,
        save: PropTypes.func,
        match: PropTypes.object
    };

    /**
     * Default constructor.
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            role: {},
            formHasChanged: false
        };
    }

    static getDerivedStateFromProps(nextProps) {
        return {
            role: nextProps.role,
            formHasChanged: false
        };
    }

    componentDidMount() {
        this.props.get(this.props.match.params.id);
    }

    /**
     * Handle change on field form.
     * @param event
     */
    handleChange(event) {
        const state = {...this.state};
        state['role'][event.target.name] = event.target.value;
        state['formHasChanged'] = true;
        this.setState(state);
    }

    /**
     * Handle change on resource select field form.
     * @param selected
     */
    handleChangeSelectResource(selected) {
        const state = {...this.state};
        state['role']['resource'] = selected.value;
        state['formHasChanged'] = true;
        this.setState(state);
    }

    /**
     * Handle change on action select field form.
     * @param selected
     */
    handleChangeSelectAction(selected) {
        const state = {...this.state};
        state['role']['action'] = selected.value;
        state['formHasChanged'] = true;
        this.setState(state);
    }

    /**
     * Handle change on submit form.
     * @param e
     */
    onSubmit(e) {
        e.preventDefault();
        this.props.save(this.state.role);
        this.setState({formHasChanged: false});
    }

    render() {
        const title = `${this.state.role.role} [${this.state.role.resource}] [${this.state.role.action}]`;
        console.log('this.state.role.resource', this.state.role.resource);
        console.log('this.state.role.action', this.state.role.action);
        return (
            <div>
                <Breadcrumbs title={title}/>
                <Grid fluid className="main-padding">
                    <Helmet title={`Role - ${title}`}/>
                    <Row>
                        <Panel>
                            <Panel.Heading>
                                <Panel.Title>
                                    <i className="fa fa-user-circle fa-fw"></i>
                                    <span>&nbsp;Role {title}</span>
                                </Panel.Title>
                            </Panel.Heading>
                            <Panel.Body>
                                <Form>
                                    <FormGroup controlId="role">
                                        <ControlLabel>Role</ControlLabel>
                                        <span className="required">*</span>
                                        <FormControl id="role"
                                                     name="role"
                                                     type="text"
                                                     label="Role"
                                                     required="required"
                                                     value={this.state.role.role || ''}
                                                     placeholder="Role Name"
                                                     onChange={this.handleChange.bind(this)}
                                        />
                                    </FormGroup>

                                    <FormGroup controlId="resource">
                                        <ControlLabel>Resource</ControlLabel>
                                        <span className="required">*</span>
                                        <Select name="resource"
                                                value={this.state.role.resource}
                                                onChange={this.handleChangeSelectResource.bind(this)}
                                                required={true}
                                                options={[
                                                    {value: 'user', label: 'user'},
                                                    {value: 'role', label: 'role'}
                                                ]}
                                        />
                                    </FormGroup>

                                    <FormGroup controlId="action">
                                        <ControlLabel>Action</ControlLabel>
                                        <span className="required">*</span>
                                        <Select name="action"
                                                id="role_action"
                                                value={this.state.role.action}
                                                onChange={this.handleChangeSelectAction.bind(this)}
                                                required={true}
                                                options={[
                                                    {value: 'create:any', label: 'create:any'},
                                                    {value: 'read:any', label: 'read:any'},
                                                    {value: 'update:any', label: 'update:any'},
                                                    {value: 'delete:any', label: 'delete:any'},
                                                    {value: 'create:own', label: 'create:own'},
                                                    {value: 'read:own', label: 'read:own'},
                                                    {value: 'update:own', label: 'update:own'},
                                                    {value: 'delete:own', label: 'delete:own'}
                                                ]}
                                        />
                                    </FormGroup>

                                    <FormGroup controlId="attributes">
                                        <ControlLabel>Attributes</ControlLabel>
                                        <span className="required">*</span>
                                        <FormControl id="attributes"
                                                     name="attributes"
                                                     type="text"
                                                     label="Attributes"
                                                     value={this.state.role.attributes || ''}
                                                     required="required"
                                                     placeholder="Attributes"
                                                     onChange={this.handleChange.bind(this)}
                                        />
                                    </FormGroup>
                                    <Button bsStyle="primary"
                                            disabled={!this.state.formHasChanged}
                                            onClick={this.onSubmit}>Save
                                    </Button>
                                </Form>
                            </Panel.Body>
                        </Panel>
                    </Row>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    role: state.roles.item
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    get: (id) => roles.get(id),
    save: (state) => roles.update(state)
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Role);
