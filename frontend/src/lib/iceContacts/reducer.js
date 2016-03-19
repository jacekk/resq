import * as consts from '../constants';
import {Map, List, fromJS} from "immutable";

const initialState = Map({});

export default function iceContacts(state = initialState, action) {
    switch (action.type) {
        case consts.ICE_CONTACT_CREATE:
            return state.set(action.payload.id, Map(action.payload));
        case consts.ICE_CONTACT_REMOVE:
            return state.delete(action.payload.id);
        case consts.CONTACTS_LOADED:
            action.payload.contacts.forEach((item) => {
                state = state.set(item.id, fromJS(item));
            })

            return state;
    }
    return state;
}
