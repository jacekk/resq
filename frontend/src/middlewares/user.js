import superagent from 'superagent';
import * as C from '../lib/constants';
import {notify, hideNotification} from '../lib/notification/actions';
import {userGetSuccess} from '../lib/user/actions';

const createRequest = (next, state, resourceName) => {
    return superagent
        .post(C.API_URL + resourceName)
        .send(state.user.get('account'))
        .set('Accept', 'application/json')
        .end((err, res) => {
            if (res && res.body && res.body.message && res.body.message.session) {
                next(userGetSuccess(res.body.message.session));
                return;
            }
            if (err && err.status && err.status === 422) {
                if ('login' === resourceName) {
                    next(notify(C.NOTIFY_ERROR, 'Wrong login or password.'));
                } else {
                    next(notify(C.NOTIFY_ERROR, err.message));
                }
                return;
            }
            if ('login' === resourceName) {
                next(notify(
                    C.NOTIFY_ERROR,
                    res && res.body && res.body.message || 'Unhandled situation. Let us now.'
                ));
                return;
            }
            window.location.hash = '/login';
            setTimeout(() => {
                next(notify(C.NOTIFY_SUCCESS, 'Registration succesful. You can login now.'));
            }, 3e3);
        });
}

export function userRegisterMiddleware({ getState }) {
    return (next) => {
        return (action) => {
            if (! action.type || C.USER_REGISTER !== action.type) {
                return next(action);
            }

            return createRequest(next, getState(), 'register');
        };
    };
};

export function userLoginMiddleware({ getState }) {
    return (next) => {
        return (action) => {
            if (! action.type || C.USER_LOGIN !== action.type) {
                return next(action);
            }

            return createRequest(next, getState(), 'login');
        };
    };
};
