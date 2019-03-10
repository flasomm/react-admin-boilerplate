import {
    REQUEST_FAILURE,
    REQUEST_WARNING,
    REQUEST_NOT_FOUND,
    REQUEST_SUCCEED,
    REQUEST_DUPLICATE,
    REQUEST_DENIED,
    LOADING,
    END_LOADING
} from 'shared/actions';

import i18n from 'shared/i18n';

export default function request() {
    return next => action => {
        const {promise, type, ...rest} = action;

        if (!promise) return next(action);

        const SUCCESS = type;

        next({type: LOADING});
        next({type: `REQUEST_${type}`});

        return promise
            .then(res => {
                switch (res.status) {
                    case 400:
                        res.json().then(payload => {
                            next({
                                ...rest,
                                payload,
                                type: REQUEST_WARNING,
                                message: (action.error) ? action.error.toString() : payload.message
                            });
                            next({type: END_LOADING});
                        });
                        break;
                    case 401:
                        next({...rest, res, type: REQUEST_DENIED, message: i18n(action.type, 401)});
                        next({type: END_LOADING});
                        break;
                    case 404:
                        res.json().then(payload => {
                            next({...rest, payload, type: REQUEST_NOT_FOUND, message: i18n(action.type, 404)});
                            next({type: END_LOADING});
                        });
                        break;
                    case 409:
                        res.json().then(payload => {
                            next({...rest, payload, type: REQUEST_DUPLICATE, message: i18n(action.type, 409)});
                            next({type: END_LOADING});
                        });
                        break;
                    case 500:
                        res.json().then(payload => {
                            next({
                                ...rest,
                                payload,
                                type: REQUEST_FAILURE,
                                message: (action.error) ? action.error.toString() : payload.message
                            });
                            next({type: END_LOADING});
                        });
                        break;
                    default:
                        res.json().then(payload => {
                            if (!type.match('GET')) {
                                next({...rest, payload, type: REQUEST_SUCCEED, message: i18n(action.type, 200)});
                                next({type: END_LOADING});
                            }
                            next({...rest, payload, type: SUCCESS});
                            next({type: END_LOADING});
                        });
                }

                next({type: END_LOADING});
                /* simple chaining mechanism, at least return something from our promise */
                return res;
            })
            .catch(error => {
                next({type: END_LOADING});
                next({...rest, error, type: REQUEST_FAILURE, message: ''});
                return false;
            });
    };
}
