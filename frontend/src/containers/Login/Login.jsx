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
                    <div className="alignCenter">
						<img src="./svg/user.svg"/>
						<h1>Login</h1>
                    </div>
                    <form onSubmit={this.onSubmit}>
                        <p className="control">
                            <Field name="email" label="Email" binding={this.handleChange} type="email"/>
                        </p>
                        <p className="control">
                            <Field name="password" label="Password" binding={this.handleChange} type="password"/>
                        </p>
                        <p className="control alignCenter">
                            <button type="submit" className="button button--primary">
                                Log in
                            </button>
							<span className="or">or</span>
							<a className="button" href="#/register">Register</a>
                        </p>
                    </form>
                    <br/>
                </div>
            </section>
        )
    }
}
