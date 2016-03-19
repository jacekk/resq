import {STATUS_UPDATE} from '../constants';

export function statusUpdate(expires, lat, lng) {
    return {
        type: STATUS_UPDATE,
        payload: {
            expires, lat, lng
        }
    }
}
