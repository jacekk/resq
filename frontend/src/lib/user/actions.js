import {USER_CREATE} from '../constants';

export function userCreate(email, password, telephone) {
    return {
        type: USER_CREATE,
        payload: {
            email, password, telephone
        },
        meta: {
            validator: {
                email: {
                    func: (email) => {
                        return !!email;
                    },
                    msg: 'Invalid email'
                }
            }
        }
    }
}
