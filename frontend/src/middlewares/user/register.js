import superagent from 'superagent';
import * as C from '../../lib/constants';

export default function userRegisterMiddleware({ getState }) {
    return (next) => {
        return (action) => {
            if (! action.type || C.USER_REGISTER !== action.type) {
                return next(action);
            }

            const state = getState();

            // next({
            //     type: PENDING,
            //     params
            // });

            return superagent
              .post(`${C.API_URL}register`)
              .send(state.user.get('account'))
              .set('Accept', 'application/json')
              .end((err, res) => {
                    console.log('response', err, res);
            //     if (err || !res.body || res.body.code !== 0) {
            //       next({
            //         type: REJECTED,
            //         params
            //       });
            //     }
            //     else {
            //       next({
            //         type: FULFILLED,
            //         params,
            //         data: res.body.data
            //       });
            //     }
              });
        };
    };
};
