import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import {Grid, Form, FormControl, FormGroup, ControlLabel, Col, Row} from 'react-bootstrap';
import {auth} from 'actions/index';
import styles from './styles.css';

const config = require('config');

/**
 * Login page class.
 */
class Login extends Component {
    static propTypes = {
        auth: PropTypes.object,
        history: PropTypes.object,
        login: PropTypes.func,
        dispatch: PropTypes.func
    };

    static defaultProps = {
        isAuthenticated: false,
        errorMessage: ''
    };

    /**
     * Default constructor.
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
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
        this.props.login(this.state.email, this.state.password);
    }

    displayMessage() {
        if (!this.props.auth.message) {
            return '';
        }
        return (
            <div className={`alert alert-${this.props.auth.isError ? 'danger' : 'success'}`} role="alert">
                {this.props.auth.message}
            </div>
        );
    }

    /**
     * Render
     * @returns {XML}
     */
    render() {
        return (
            <Grid fluid>
                <Row className={`${styles['justify-content-center']} ${styles.row}`}>
                    <Col lg={4} md={8}>
                        <div className={`${styles['login-content']} ${styles.card}`}>
                            <div className={`${styles['login-form']}`}>
                                <Helmet title={`Sign In - ${config.app.title}`}/>
                                <h4>Login</h4>
                                <Form horizontal onSubmit={this.onSubmit.bind(this)}>
                                    <FormGroup>
                                        <Col sm={12}>
                                            <ControlLabel>Email address</ControlLabel>
                                            <FormControl
                                                type="email"
                                                name="email"
                                                placeholder="Email"
                                                value={this.state.email || ''}
                                                onChange={this.handleChange.bind(this)}
                                            />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup>
                                        <Col sm={12}>
                                            <ControlLabel>Password</ControlLabel>
                                            <FormControl
                                                type="password"
                                                name="password"
                                                placeholder="Password"
                                                value={this.state.password || ''}
                                                onChange={this.handleChange.bind(this)}
                                            />
                                        </Col>
                                    </FormGroup>
                                    {this.displayMessage()}
                                    <button type="submit" className="btn btn-primary">Sign In</button>
                                </Form>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

const mapDispatchToProps = dispatch => bindActionCreators({
    login: (email, password) => auth.login(email, password),
    dispatch: () => dispatch
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Login);
