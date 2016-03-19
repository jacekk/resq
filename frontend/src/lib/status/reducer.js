import * as consts from '../constants';
import {Map} from "immutable";

const initialState = Map({
    "message": consts.DEFAULT_MESSAGE_OK,
    "expires": "00:00:00",
    "lat": 1,
    "lng": 1,
    "type": "ok"
});

export default function status(state = initialState, action) {
    switch (action.type) {
        case consts.STATUS_SEND:
        case consts.STATUS_UPDATE:
            return state.withMutations(map => {
                map.set('expires', action.payload.expires);
                map.set('type', action.payload.type);
                map.set('message', action.payload.message);

                if (action.payload.lat !== undefined && action.payload.lng !== undefined) {
                    map.set('lat', action.payload.lat);
                    map.set('lng', action.payload.lng);
                }
            });
    }

    return state;
}
