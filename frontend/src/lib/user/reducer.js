import * as consts from '../constants';
import {Map} from "immutable";

const initialState = Map({});

export default function user(state = initialState, action) {
    switch (action.type) {
        case consts.USER_GET:
            return state.set('account', Map(action.payload));
        case consts.USER_CLEAR_SESSION:
            return state.delete('sessionId');
        case consts.USER_GET_SUCCESS:
            state = state.set('sessionId', action.payload.sessionId)
            window.location.hash = '/timer';
            return state;
        case consts.USER_CREATE:
            return state.set('account', Map(action.payload));
    }

    return state;
}
