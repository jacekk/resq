import React from 'react';
import {render} from 'react-dom';
import {Provider, connect} from 'react-redux';
import {Router, Route, IndexRoute, Link, hashHistory, RouterContext, browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux'

import './phone';

import AppContainer from './containers/App';
import iceContactsContainer from './containers/iceContacts';
import phoneContactsContainer from './containers/phoneContacts';
import RegisterContainer from './containers/Register';
import LoginContainer from './containers/Login';
import TimerContainer from './containers/Timer';

const App = connect(state => state)(AppContainer);
const iceContacts = connect(state => state)(iceContactsContainer);
const phoneContacts = connect(state => state)(phoneContactsContainer);
const Register = connect(state => state)(RegisterContainer);
const Login = connect(state => state)(LoginContainer);
const Timer = connect(state => state)(TimerContainer);

import store from './store';

require("font-awesome-webpack");
import "!style!css!../node_modules/bulma/css/bulma.css";
import "!style!css!less!./main.less";

const history = syncHistoryWithStore(hashHistory, store);

render(
    <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={App}>
            <IndexRoute component={Login}/>
            <Route path="register" component={Register}/>
            <Route path="timer" component={Timer}/>
            <Route path="contacts" component={iceContacts}>
              <Route path="add" component={phoneContacts}/>
            </Route>
            <Route path="contactpicker" component={phoneContacts}/>
          </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
);
