/**
 * Copyright (c) 2018-Physalix, Fabrice Sommavilla.
 * Licensed under the MIT License (MIT).
 * See https://github.com/flasomm/react-starter-boilerplate
 * @date     22/05/2018
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Header, Footer, Loading, Menu, Notification} from 'components/index';
import styles from './styles.css';

/**
 * App page class.
 */
class App extends Component {
    /**
     *
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            lastMessage: {}
        };
    }

    static propTypes = {
        children: PropTypes.node,
        app: PropTypes.object.isRequired
    };

    /**
     *
     * @param nextProps
     */
    static getDerivedStateFromProps(nextProps, state) {
        console.log('nextProps', nextProps);
        console.log('state', state);
        if (nextProps.app.notification && nextProps.app.notification.id !== state.lastMessage.id) {
            return {
                lastMessage: nextProps.app.notification
            };
        }
        return null;
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('prevProps', prevProps);
        console.log('prevState', prevState);
        // if (prevProps.app.notification && prevProps.app.notification.id !== prevState.lastMessage.id) {
            this.notification.popUp(this.state.lastMessage);
        // }
    }

    render() {
        return (
            <div id={styles['main-wrapper']}>
                <Notification ref={ref => { this.notification = ref; }}/>
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

const mapStateToProps = (state) => ({
    app: state.app
});

export default connect(mapStateToProps)(App);

