import superagent from 'superagent';
import * as C from '../lib/constants';
import {contactsLoaded} from '../lib/request/actions'
import {notify, hideNotification} from '../lib/notification/actions';

export function contactsGetMiddleware({ getState }) {
    return (next) => {
        return (action) => {
            if (! action.type || C.CONTACTS_GET !== action.type) {
                return next(action);
            }

            const sessionId = getState().user.get('sessionId');
            if (! sessionId) {
                window.location.hash = '/';
                return;
            }

            return superagent
                .get(C.API_URL + 'contacts')
                .set('Accept', 'application/json')
                .set('Authorization', sessionId)
                .end((err, res) => {
                    if (err || !res.body) {
                        window.location.hash = '/';
                        return;
                    }
                    return next(contactsLoaded(res.body));
                });
        };
    };
};

export function contactAddMiddleware({ getState }) {
    return (next) => {
        return (action) => {
            if (! action.type || C.ICE_CONTACT_CREATE !== action.type) {
                return next(action);
            }

            const sessionId = getState().user.get('sessionId');
            if (! sessionId) {
                window.location.hash = '/';
                return;
            }

            return superagent
                .post(C.API_URL + 'contact')
                .send({
                    name: action.payload.name,
                    telephone: action.payload.telephone,
                })
                .set('Accept', 'application/json')
                .set('Authorization', sessionId)
                .end((err, res) => {
                    if (res && res.body && res.body.id) {
                        action.payload.id = parseInt(res.body.id, 10);
                        next(action);
                        return;
                    }
                    next(notify(C.NOTIFY_ERROR, 'Error adding contact'));
                });
        };
    };
};

export function contactDeleteMiddleware({ getState }) {
    return (next) => {
        return (action) => {
            if (! action.type || C.ICE_CONTACT_REMOVE !== action.type) {
                return next(action);
            }

            const sessionId = getState().user.get('sessionId');
            if (! sessionId) {
                window.location.hash = '/';
                return;
            }

            return superagent
                .get(C.API_URL + 'contact/delete/' + action.payload.id)
                .set('Accept', 'application/json')
                .set('Authorization', sessionId)
                .end((err, res) => {
                    if (! err) {
                        return next(action);
                    }
                    next(notify(C.NOTIFY_ERROR, 'Error removing contact.'));
                });
        };
    };
};
