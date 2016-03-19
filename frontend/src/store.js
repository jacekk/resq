import {createStore, applyMiddleware, compose, Middleware, combineReducers} from 'redux';
import {fromJS, Map} from "immutable";

import user from "./lib/user/reducer";
import notification from "./lib/notification/reducer";
import phoneContacts from "./lib/phoneContacts/reducer";
import iceContacts from "./lib/iceContacts/reducer";
import {userRegisterMiddleware, userLoginMiddleware} from './middlewares/user';
import {contactsGetMiddleware} from './middlewares/contacts';

let store;

function getInitialState(source) {
    let immutableState = {};
    for (let key in source) {
        if (source.hasOwnProperty(key)) {
            immutableState[key] = fromJS(source[key]);
        }
    }
    return immutableState;
}

let reducers = combineReducers({
    user,
    notification,
    phoneContacts,
    iceContacts
});

let data = {};

import Validator from 'redux-validator';

const validator = Validator();
const createStoreWithMiddleware = applyMiddleware(
    validator,
    contactsGetMiddleware,
    userLoginMiddleware,
    userRegisterMiddleware
)(createStore);

store = createStoreWithMiddleware(reducers, getInitialState(data), compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
));
window.store = store;
export default store;
