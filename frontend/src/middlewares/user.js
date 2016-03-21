import superagent from 'superagent';
import * as C from '../lib/constants';
import {notify, hideNotification} from '../lib/notification/actions';
import {userGetSuccess} from '../lib/user/actions';

export function userRegisterMiddleware({ getState }) {
    return (next) => {
        return (action) => {
            if (! action.type || C.USER_REGISTER !== action.type) {
                return next(action);
            }

            const state = getState();

            return superagent
                .post(C.API_URL + 'register')
                .send(state.user.get('account'))
                .set('Accept', 'application/json')
                .end((err, res) => {
                    if (err && err.status && err.status === 422) {
                        console.log(res, res.body, res.body.message);
                        next(notify(
                            C.NOTIFY_ERROR,
                            res && res.body && res.body.message || 'Unexpected error. Please try again.'
                        ));
                        return;
                    }
                    if (err) {
                        next(notify(C.NOTIFY_ERROR, err.message));
                        return;
                    }
                    if (! res.body || ! res.body.id) {
                        next(notify(C.NOTIFY_ERROR, 'Unecepected error. Please try again.'));
                        return;
                    }
                    window.location.hash = '/';
                    setTimeout(() => {
                        next(notify(C.NOTIFY_SUCCESS, 'Registration succesful. You can login now.'));
                    }, 2e3);
                });
        };
    };
};

export function userLoginMiddleware({ getState }) {
    return (next) => {
        return (action) => {
            if (! action.type || C.USER_LOGIN !== action.type) {
                return next(action);
            }

            const state = getState();

            return superagent
                .post(C.API_URL + 'login')
                .send(state.user.get('account'))
                .set('Accept', 'application/json')
                .end((err, res) => {
                    if (res && res.body && res.body.message && res.body.message.session) {
                        next(userGetSuccess(res.body.message.session));
                        return;
                    }
                    if (err && err.status && err.status === 422) {
                        next(notify(C.NOTIFY_ERROR, 'Wrong login or password.'));
                        return;
                    }
                    next(notify(
                       C.NOTIFY_ERROR,
                       res && res.body && res.body.message || 'Unhandled situation. Let us now.'
                    ));
                });
        };
    };
};
