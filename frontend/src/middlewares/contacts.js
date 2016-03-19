import superagent from 'superagent';
import * as C from '../lib/constants';
import {notify, hideNotification} from '../lib/notification/actions';

export function contactsGetMiddleware({ getState }) {
    return (next) => {
        return (action) => {
            if (! action.type || C.CONTACTS_GET !== action.type) {
                return next(action);
            }

            return superagent
              .get(C.API_URL + 'contacts')
              .set('Accept', 'application/json')
              .end((err, res) => {
                  if (err || !res.body) {
                      window.location.hash = '/';
                  } else {
                      window.location.hash = '/timer';
                  }
              });
        };
    };
};
