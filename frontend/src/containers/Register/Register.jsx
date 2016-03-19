import React from 'react';

import Field from '../../components/FormField';
import {NOTIFY_ERROR, NOTIFY_INFO} from '../../lib/constants';
import {userCreate, clearSession} from '../../lib/user/actions';
import {registerRequest} from '../../lib/request/actions';
import {notify, hideNotification} from '../../lib/notification/actions';

export default class Register extends React.Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            email: '',
            password: '',
            telephone: ''
        };
    }

    componentDidMount() {
        this.props.dispatch(clearSession());
    }

    onSubmit(ev) {
        ev.preventDefault();
        let {email, password, telephone} = this.state;
        let action = userCreate(email, password, telephone);
        let result = this.props.dispatch(action);
        if (result.err) {
            this.props.dispatch(notify(NOTIFY_ERROR, result.msg));
        } else {
            this.props.dispatch(notify(NOTIFY_INFO, 'Pending...'));
            this.props.dispatch(registerRequest(email, password, telephone));
            this.setState({
                email: '',
                password: '',
                telephone: ''
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
                <a href="#/" className="topIcon topIcon--left">
                    <img src="./svg/back.svg"/>
                </a>
            <div className="content">
                <div className="alignCenter">
                    <img src="./svg/register.svg"/>
                    <h1>Register</h1>
                </div>
                <form onSubmit={this.onSubmit}>
                    <p className="control">
                        <Field name="email" label="Email" binding={this.handleChange} type="email"/>
                    </p>
                    <p className="control">
                        <Field name="password" label="Password" binding={this.handleChange} type="password"/>
                    </p>
                    <p className="control">
                        <Field name="telephone" label="Telephone" binding={this.handleChange}/>
                    </p>
                    <p className="control alignCenter">
                        <button type="submit" className="button button--primary">
                            Register
                        </button>
                    </p>
                </form>
            </div>
            </section>
        )
    }
}
