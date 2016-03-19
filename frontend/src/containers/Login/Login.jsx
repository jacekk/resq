import React from 'react';

import Field from '../../components/FormField';
import {NOTIFY_ERROR, NOTIFY_INFO} from '../../lib/constants';
import {userGet} from '../../lib/user/actions';
import {loginRequest} from '../../lib/request/actions';
import {notify, hideNotification} from '../../lib/notification/actions';

export default class Login extends React.Component {
	constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            email: '',
            password: '',
        };
    }

    onSubmit(ev) {
        ev.preventDefault();
        let {email, password} = this.state;
        let result = this.props.dispatch(userGet(email, password));
        if (result.err) {
            this.props.dispatch(notify(NOTIFY_ERROR, result.msg));
        } else {
            this.props.dispatch(notify(NOTIFY_INFO, 'Pending...'));
            this.props.dispatch(loginRequest(email, password));
            this.setState({
                email: '',
                password: ''
            });
        }
    }

    handleChange(ev) {
        ev.preventDefault();
        this.props.dispatch(hideNotification());
        this.setState({
            [ev.target.name]: ev.target.value,
        });
    }

    render() {
        return (
            <section className="section">
                <div className="content">
                    <h2>Login form</h2>
                    <form onSubmit={this.onSubmit}>
                        <p className="control">
                            <Field name="email" label="Email" binding={this.handleChange} type="email"/>
                        </p>
                        <p className="control">
                            <Field name="password" label="Password" binding={this.handleChange} type="password"/>
                        </p>
                        <p className="control">
                            <button type="submit" className="button is-success">
                                Log in
                            </button>
                        </p>
                    </form>
                    <br/>
                    <a className="button" href="#/register">or Register</a>
                </div>
            </section>
        )
    }
}
