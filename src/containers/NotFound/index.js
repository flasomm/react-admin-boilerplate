/**
 * @author   Fabrice Sommavilla <fs@physalix.com>
 * @company  Physalix
 * @version  0.1
 * @date     22/05/2018
 */

import React, {Component} from 'react';

/**
 * Not found class.
 * @returns {XML}
 * @constructor
 */
export default class NotFound extends Component {
    render() {
        return (
            <div className="container">
                <h1>Doh! 404!</h1>
                <p>These are <em>not</em> the droids you are looking for!</p>
            </div>
        );
    }
}
