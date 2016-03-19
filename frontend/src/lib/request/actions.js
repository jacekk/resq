import * as C from '../constants';

export function registerRequest(email, password, telephone) {
    return {
        type: C.USER_REGISTER,
        payload: {
            email, password, telephone
        }
    }
}

export function loginRequest(email, password) {
    return {
        type: C.USER_LOGIN,
        payload: {
            email, password
        }
    }
}

export function contactsRequest() {
    return {
        type: C.CONTACTS_GET,
    }
}
