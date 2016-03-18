import * as consts from '../constants';
import {Map, List} from "immutable";

const initialState = Map({});

export default function user(state = initialState, action) {
    switch (action.type) {
        case consts.USER_CREATE:
            return state.set('account', Map(action.payload));
    }

    return state;
}
