import * as consts from '../constants';
import {Map} from "immutable";

const initialState = Map({});

export default function user(state = initialState, action) {
    switch (action.type) {
        case consts.USER_GET:
            return state.set('account', Map(action.payload));
        case consts.USER_CREATE:
            return state.set('account', Map(action.payload));
        case consts.USER_REGISTER_ERROR:
            console.log('@todo', action.type, state);
            return state;
    }

    return state;
}
