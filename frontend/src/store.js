import {createStore, applyMiddleware, compose, Middleware, combineReducers} from 'redux';
import {fromJS, Map} from "immutable";

import user from "./lib/user/reducer";

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

let reducers = combineReducers({user});
let data = {};
export default store = (createStore)(reducers, getInitialState(data));
