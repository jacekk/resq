import superagent from 'superagent';
import * as C from '../../lib/constants';

export default function userRegisterMiddleware({ getState }) {
    return (next) => {
        return (action) => {
            if (! action.type || C.USER_REGISTER !== action.type) {
                return next(action);
            }

            const state = getState();

            return superagent
              .post(`${C.API_URL}register`)
              .send(state.user.get('account'))
              .set('Accept', 'application/json')
              .end((err, res) => {
                    if (err || !res.body) {
                        next({
                            type: C.USER_REGISTER_ERROR
                        });
                    } else {
                        window.location.hash = '/timer';
                    }
              });
        };
    };
};
