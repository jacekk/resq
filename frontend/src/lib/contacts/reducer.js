import * as consts from '../constants';
import {Map, List} from "immutable";

const initialState = Map({});

export default function contacts(state = initialState, action) {
    switch (action.type) {
        case consts.CONTACT_CREATE:
            return state.set(action.payload.id, Map(action.payload));
        case consts.CONTACT_REMOVE:
            return state.delete(action.payload.id);
    }
    return state;
}
