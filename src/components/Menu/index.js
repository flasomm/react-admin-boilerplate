/**
 * This program belongs to Physalix.
 * It is considered a trade secret, and is not to be divulged or used
 * by parties who have not received written authorization from the owner.
 * For more details please contact us on fs@physalix.com
 *
 * @author   Fabrice Sommavilla <fs@physalix.com>
 * @company  Physalix
 * @version  0.1
 * @date     10/06/2018
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {auth} from 'actions/index';
import styles from './styles.css';

/**
 * App page class.
 */
class Menu extends Component {
    static propTypes = {
        isAuthenticated: PropTypes.bool,
        isLoggedIn: PropTypes.func.isRequired
    };

    static defaultProps = {
        isAuthenticated: false
    };

    constructor(props) {
        super(props);
        if (!props.isAuthenticated) {
            setTimeout(() => {
                props.isLoggedIn();
            }, 5);
        }
    }

    render() {
        const {isAuthenticated} = this.props;
        if (isAuthenticated) {
            console.log(isAuthenticated);
        }
        return (
            <div className={styles['sidebar']}>
                <nav>
                    <ul className={styles['cd-accordion-menu']}>
                        <li><a href="#0">Users</a></li>
                        <li><a href="#0">Roles</a></li>
                        <li className={styles['has-children']}>
                            <input type="checkbox" name="group-1" id="group-1"/>
                            <label htmlFor="group-1">System</label>
                            <ul>
                                <li><a href="#0">Image</a></li>
                                <li><a href="#0">Image</a></li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    isLoggedIn: () => auth.isLoggedIn()
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
