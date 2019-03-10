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
        add: PropTypes.func,
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
            formHasChanged: false,
            action: props.match.params.id === 'new' ? 'create' : 'update'
        };
    }

    static getDerivedStateFromProps(nextProps) {
        return {
            user: nextProps.user,
            formHasChanged: false
        };
    }

    componentDidMount() {
        if (this.state.action === 'update') {
            this.props.get(this.props.match.params.id);
        } else {
            this.props.add();
        }
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
     * Handle change on role select field form.
     * @param selected
     */
    handleChangeSelectRole(selected) {
        const state = {...this.state};
        state['user']['role'] = selected.value;
        state['formHasChanged'] = true;
        this.setState(state);
    }

    /**
     * Handle change on submit form.
     * @param e
     */
    onSubmit(e) {
        e.preventDefault();
        this.props[this.state.action](this.state.user);
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
    user: state.users.item
});

const mapDispatchToProps = dispatch => bindActionCreators({
    add: () => users.add(),
    get: id => users.get(id),
    update: state => users.update(state),
    create: state => users.create(state)
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(User);
