/**
 * Copyright (c) 2018-Physalix, Fabrice Sommavilla.
 * Licensed under the MIT License (MIT).
 * See https://github.com/flasomm/react-starter-boilerplate
 * @date  07/08/2018
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

/**
 * Loading class component.
 */
class Loading extends Component {
    static propTypes = {
        loading: PropTypes.bool
    };

    /**
     * Render component
     * @returns {XML}
     */
    render() {
        return (
            <div>
                {this.props.loading ?
                    <div className='loading'>
                        <i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
                    </div>
                    : null}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    loading: state.app.loading
});

export default connect(mapStateToProps)(Loading);
