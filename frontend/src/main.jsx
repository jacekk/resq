import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute, Link, hashHistory} from 'react-router'

import './phone';

import App from './containers/App';
import Contacts from './containers/Contacts';
import Register from './containers/Register';
import Login from './containers/Login';

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
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Login}/>
        <Route path="register" component={Register}/>
        <Route path="contacts" component={Contacts}>
          <Route path="add" component={ContactsAdd}/>
        </Route>
      </Route>
    </Router>,
    document.getElementById('app')
);
