import * as consts from '../constants';
import {Map} from "immutable";

const initialState = Map({
    "message": "Went into a mine. Help me!",
    "expires": "00:00:00",
    "lat": 1,
    "lng": 1
});

export default function status(state = initialState, action) {
    switch (action.type) {
        case consts.STATUS_UPDATE:
            return state.withMutations(map => {
                map.set('expires', action.payload.expires);

                if (action.payload.lat !== undefined && action.payload.lng !== undefined) {
                    map.set('lat', action.payload.lat);
                    map.set('lng', action.payload.lng);
                }
            });
    }

    return state;
}
