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
import {Grid, Row, Panel} from 'react-bootstrap';
import {UserForm, Breadcrumbs} from 'components/index';
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
            profile: {},
            formHasChanged: false
        };
    }

    static getDerivedStateFromProps(props) {
        return {
            profile: props.user,
            formHasChanged: false
        };
    }

    componentDidMount() {
        this.props.get(this.props.authUser._id);
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
     * Handle change on role select field form.
     * @param selected
     */
    handleChangeSelectRole(selected) {
        const state = {...this.state};
        state['profile']['role'] = selected.value;
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
            <div>
                <Breadcrumbs />
                <Grid fluid className="main-padding">
                    <Row>
                        <Panel>
                            <Panel.Heading>
                                <Panel.Title componentClass="h3">{title}</Panel.Title>
                            </Panel.Heading>
                            <Panel.Body>
                                <UserForm user={this.state.profile}
                                          handleChange={this.handleChange.bind(this)}
                                          handleChangeSelectRole={this.handleChangeSelectRole.bind(this)}
                                          formHasChanged={this.state.formHasChanged}
                                          onSubmit={this.onSubmit.bind(this)}/>
                            </Panel.Body>
                        </Panel>
                    </Row>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    authUser: state.auth.user,
    user: state.users.item
});

const mapDispatchToProps = dispatch => bindActionCreators({
    get: id => users.get(id),
    save: state => users.update(state)
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
