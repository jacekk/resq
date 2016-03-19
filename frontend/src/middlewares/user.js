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
            if (res.body && res.body.message && res.body.message.session) {
                next(userGetSuccess(res.body.message.session));
                return;
            }
            if (err && err.status && err.status === 422) {
                next(notify(C.NOTIFY_ERROR, 'Wrong login or password.'));
                return;
            }
            next(notify(C.NOTIFY_ERROR, 'Lores.bodyading error. Try once again.'));
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
