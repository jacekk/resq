import * as consts from '../constants';
import {Map, List} from "immutable";

const initialState = Map({});

export default function phoneContacts(state = initialState, action) {
    switch (action.type) {
        case consts.PHONE_CONTACT_CREATE:
            return state.set(action.payload.id, Map(action.payload));
    }
    return state;
}
