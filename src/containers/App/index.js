import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {Header, Footer, Loading, Menu, Notification} from 'components/index';
import {auth, users} from 'actions/index';
import styles from './styles.css';

/**
 * App page class.
 */
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authUser: {},
            abilities: []
        };
    }

    static propTypes = {
        abilities: PropTypes.array,
        authUser: PropTypes.object,
        get: PropTypes.func,
        children: PropTypes.element.isRequired
    };

    static propTypes = {
        children: PropTypes.node
    };

    componentDidMount() {
        if (this.props.authUser._id) {
            this.props.get(this.props.authUser._id);
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (props.auth.user !== state.authUser) {
            return {
                authUser: props.auth.user,
                abilities: props.auth.roles
            };
        }
        return null;
    }

    render() {
        return (
            <div id={styles['main-wrapper']}>
                <Notification />
                <Loading />
                <Header />
                <div className={styles['app-body']}>
                    <Menu />
                    <div className={styles.main}>
                        {this.props.children}
                        <Footer />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    ...state,
    isAuthenticated: state.auth.isAuthenticated,
    abilities: state.auth.roles,
    authUser: state.auth.user
});

const mapDispatchToProps = dispatch => bindActionCreators({
    isLoggedIn: () => auth.isLoggedIn(),
    get: id => users.get(id)
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
