import React from 'react';

export default class App extends React.Component {
    render() {
        return (
            <div>
                <h3>Start page</h3>
                <br/>
                <a href="#/register">Register</a>
                <br/>
                <a href="#/login">Login</a>
                <br/>
                <a href="#/contacts">Contacts</a>
            </div>
        )
    }
}
