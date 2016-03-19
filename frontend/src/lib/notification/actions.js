import * as C from '../constants';

export function notify(type = C.NOTIFY_SUCCESS, msg = '') {
    return {
        type: C.NOTIFICATION_SHOW,
        payload: {
            type, msg
        }
    }
}

export function hideNotification() {
    return {
        type: C.NOTIFICATION_HIDE
    }
}
