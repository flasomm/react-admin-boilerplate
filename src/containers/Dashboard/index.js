/**
 * @author   Fabrice Sommavilla <fs@physalix.com>
 * @company  Physalix
 * @version  0.1
 * @date     22/05/2018
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';

/**
 * Dashboard page class.
 */
class Dashboard extends Component {
    /**
     * Default constructor.
     * @param props
     */
    constructor(props) {
        super(props);
        this.title = 'Dashboard';
    }

    /**
     * Render.
     * @returns {XML}
     */
    render() {
        return (
            <div>{this.title}</div>
        );
    }
}

const mapStateToProps = (state) => ({
    ...state
});

export default connect(mapStateToProps)(Dashboard);
