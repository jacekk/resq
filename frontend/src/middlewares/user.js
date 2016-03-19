import superagent from 'superagent';
import * as C from '../lib/constants';
import {notify, hideNotification} from '../lib/notification/actions';

const createRequest = (next, state, resourceName, errorActionType) => {
    return superagent
        .post(C.API_URL + resourceName)
        .send(state.user.get('account'))
        .set('Accept', 'application/json')
        .end((err, res) => {
            if (err || !res.body || !res.body.id) {
                if (err && err.status && err.status === 422) {
                    next(notify(C.NOTIFY_ERROR, 'Wrong login or password.'));
                } else {
                    next(notify(C.NOTIFY_ERROR, 'Loading error. Try once again.'));
                }
            } else {
                next(hideNotification());
                window.location.hash = '/timer';
            }
        });
}

export function userRegisterMiddleware({ getState }) {
    return (next) => {
        return (action) => {
            if (! action.type || C.USER_REGISTER !== action.type) {
                return next(action);
            }

            return createRequest(next, getState(), 'register', C.USER_REGISTER_ERROR);
        };
    };
};

export function userLoginMiddleware({ getState }) {
    return (next) => {
        return (action) => {
            if (! action.type || C.USER_LOGIN !== action.type) {
                return next(action);
            }

            return createRequest(next, getState(), 'login', C.USER_LOGIN_ERROR);
        };
    };
};
