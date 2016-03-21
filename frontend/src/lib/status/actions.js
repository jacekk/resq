import {STATUS_UPDATE, STATUS_SEND, TYPE_OK} from '../constants';

export function statusUpdate(message, expires, lat, lng, type= TYPE_OK, etap) {
    return {
        type: STATUS_UPDATE,
        payload: {
            expires, lat, lng, type, message, etap
        }
    }
}

export function statusSend(message, expires, lat, lng, type= TYPE_OK, etap) {
    return {
        type: STATUS_SEND,
        payload: {
            expires, lat, lng, type, message, etap
        }
    }
}
