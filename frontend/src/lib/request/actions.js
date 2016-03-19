import * as C from '../constants';

export function registerRequest(email, password, telephone) {
    return {
        type: C.USER_REGISTER,
        payload: {
            email, password, telephone
        }
    }
}
