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
import {Grid, Row, Panel} from 'react-bootstrap';
import {UserForm, Breadcrumbs} from 'components/index';
import {users} from 'actions/index';

/**
 * User page class.
 */
class User extends Component {
    static propTypes = {
        user: PropTypes.object,
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
            user: {},
            formHasChanged: false
        };
    }

    static getDerivedStateFromProps(nextProps) {
        return {
            user: nextProps.user,
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
            <div>
                <Breadcrumbs title={title}/>
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
                                          handleChange={this.handleChange.bind(this)}
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

const mapStateToProps = (state) => ({
    user: state.users.item
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    get: (id) => users.get(id),
    save: (state) => users.update(state)
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(User);
