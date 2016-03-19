import * as C from '../constants';
import {Map} from "immutable";

const initialState = Map({});

export default function request(state = initialState, action) {
    switch (action.type) {
        case C.USER_REGISTER:
            return state.set('requestPending', true);
    }

    return state;
}
