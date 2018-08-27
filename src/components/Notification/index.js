/**
 * Copyright (c) 2018-Physalix, Fabrice Sommavilla.
 * Licensed under the MIT License (MIT).
 * See https://github.com/flasomm/react-starter-boilerplate
 * @date  17/08/2018
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {ToastContainer, ToastMessageAnimated} from 'react-toastr';

class Notification extends Component {
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
        app: PropTypes.object.isRequired
    };

    static getDerivedStateFromProps(nextProps, state) {
        if (nextProps.app.notification && nextProps.app.notification.id !== state.lastMessage.id) {
            return {
                lastMessage: nextProps.app.notification
            };
        }
        return null;
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.app.notification && prevProps.app.notification.id === prevState.lastMessage.id) {
            const {message, status, title} = this.state.lastMessage;
            this.container[status](message || '', title || '');
        }
    }

    render() {
        return (
            <div>
                <ToastContainer ref={ref => { this.container = ref; }}
                                toastMessageFactory={React.createFactory(ToastMessageAnimated)}
                                className="toast-top-right"/>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    app: state.app
});

export default connect(mapStateToProps)(Notification);
