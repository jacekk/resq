import superagent from 'superagent';
import * as C from '../lib/constants';
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
                  }
              });
        };
    };
};
