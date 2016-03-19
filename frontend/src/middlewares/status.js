import superagent from 'superagent';
import * as C from '../lib/constants';
import {notify, hideNotification} from '../lib/notification/actions';

const createRequest = (next, action, state) => {
    const sessionId = state.user.get('sessionId');
    let suffix = '';
    if (action.payload.etap !== C.START) {
        suffix += '/put';
    } else {
        delete action.payload.type;
    }
    return superagent
        .post(C.API_URL + 'action' + suffix)
        .send(action.payload)
        .set('Accept', 'application/json')
        .set('Authorization', sessionId)
        .end((err, res) => {
            if (err) {
                next(notify(C.NOTIFY_ERROR, 'There were some problems during sending informations to the server.'));
                return;
            }
        });
}

export function statusMiddleware({ getState }) {
    return (next) => (action) => {
        if (action.type === C.STATUS_SEND) {
            return createRequest(next, action, getState());
        }
        return next(action);
    };
};
