import {createStore, applyMiddleware, compose, Middleware, combineReducers} from 'redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import {fromJS, Map} from "immutable";

import user from "./lib/user/reducer";
import notification from "./lib/notification/reducer";
import phoneContacts from "./lib/phoneContacts/reducer";
import iceContacts from "./lib/iceContacts/reducer";
import timer from "./lib/timer/reducer";
import status from "./lib/status/reducer";
import {userRegisterMiddleware, userLoginMiddleware} from './middlewares/user';
import {contactsGetMiddleware} from './middlewares/contacts';
import {contactsRequest} from './lib/request/actions';

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
    iceContacts,
    timer,
    status,
    routing: routerReducer,
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

let currentPathname = '#';
const UNAUTHORIZED_PATHS = ['/register', '/'];

store.subscribe(() => {
    const state = store.getState();
    if (! state.routing.locationBeforeTransitions.pathname) {
        return;
    }
    const pathname = state.routing.locationBeforeTransitions.pathname;
    if (pathname !== currentPathname) {
        currentPathname = pathname;
        if (UNAUTHORIZED_PATHS.indexOf(pathname) === -1) {
            store.dispatch(contactsRequest());
        }
    }
});

window.store = store;
export default store;
