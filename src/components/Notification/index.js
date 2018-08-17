/**
 * Copyright (c) 2018-Physalix, Fabrice Sommavilla.
 * Licensed under the MIT License (MIT).
 * See https://github.com/flasomm/react-starter-boilerplate
 * @date  17/08/2018
 */

import React, {Component} from 'react';
import {ToastContainer} from 'react-toastr';

export default class Notification extends Component {
    /**
     * Display Toaster popup.
     * @param options
     */
    popUp(options) {
        const status = options.status || 'info';
        if (this.container[status]) {
            this.container[status](
                options.message || '',
                options.title || '',
                {
                    timeOut: 5000,
                    extendedTimeOut: 10000
                });
        }
    }

    /**
     * Render Notification.
     * @returns {XML}
     */
    render() {
        return (
            <div>
                <ToastContainer ref={ref => { this.container = ref; }} className="toast-top-right" />
            </div>
        );
    }
}
