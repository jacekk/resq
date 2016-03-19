import React from 'react';
import {render} from 'react-dom';
import {Provider, connect} from 'react-redux';
import {Router, Route, IndexRoute, Link, hashHistory} from 'react-router'

import './phone';

import AppContainer from './containers/App';
import ContactsContainer from './containers/Contacts';
import RegisterContainer from './containers/Register';
import LoginContainer from './containers/Login';
import TimerContainer from './containers/Timer';

const App = connect(state => state)(AppContainer);
const Contacts = connect(state => state)(ContactsContainer);
const Register = connect(state => state)(RegisterContainer);
const Login = connect(state => state)(LoginContainer);
const Timer = connect(state => state)(TimerContainer);


import store from './store';

import "!style!css!less!./main.less";


const ContactsAdd = () => {
    return (
        <div>
            <Menu />
            <p>ContactsAdd</p>
        </div>
    );
}

render(
    <Provider store={store}>
        <Router history={hashHistory}>
          <Route path="/" component={App}>
            <IndexRoute component={Login}/>
            <Route path="register" component={Register}/>
            <Route path="timer" component={Timer}/>
            <Route path="contacts" component={Contacts}>
              <Route path="add" component={ContactsAdd}/>
            </Route>
          </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
);
