import {STATUS_UPDATE, STATUS_SEND} from '../constants';

export function statusUpdate(expires, lat, lng) {
    return {
        type: STATUS_UPDATE,
        payload: {
            expires, lat, lng
        }
    }
}

export function statusSend(expires, lat, lng) {
    return {
        type: STATUS_SEND,
        payload: {
            expires, lat, lng
        }
    }
}
