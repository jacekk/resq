import {USER_CREATE} from '../constants';

export function userCreate(email, password, telephone) {
    return {
        type: USER_CREATE,
        payload: {
            email, password, telephone
        }
    }
}
