import * as C from '../constants';
import {Map} from "immutable";

const initialState = Map({});

export default function notification(state = initialState, action) {
    switch (action.type) {
        case C.NOTIFICATION_SHOW:
            return state
              .set('show', true)
              .set('type', action.payload.type)
              .set('msg', action.payload.msg)
              ;
        case C.NOTIFICATION_HIDE:
            return state.set('show', false);
    }

    return state;
}
