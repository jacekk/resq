import React from 'react';
import {userCreate} from '../../lib/user/actions';

const NOTIFY_ERROR = 'error';
const NOTIFY_SUCCESS = 'success';
const NOTIFY_INFO = 'info';

import Field from '../../components/FormField';

export default class Register extends React.Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            email: '',
            password: '',
            telephone: '',
            notification: {
                value: '',
                text: ''
            }
        };
    }

    onSubmit(ev) {
        ev.preventDefault();
        let {email, password, telephone} = this.state;
        let action = userCreate(email, password, telephone);
        let result = this.props.dispatch(action);
        if (result.err) {
            this.notify(result, NOTIFY_ERROR);
        } else {
            this.setState({
                email: '',
                password: '',
                telephone: ''
            });
            this.notify({
                msg: "Account created"
            }, NOTIFY_SUCCESS);
        }
    }

    notify(result, type = NOTIFY_INFO) {
        this.setState({
            notification: {
                type,
                text: result.msg
            }
        });
    }

    handleChange(ev) {
        ev.preventDefault();
        this.setState({
            [ev.target.name]: ev.target.value,
        });
    }

    render() {
        return (
            <div>
                <h3>Register form</h3>
                {this.renderNotification()}
                <form onSubmit={this.onSubmit}>
                    <Field name="email" label="Email" binding={this.handleChange} type="email"/>
                    <Field name="password" label="Password" binding={this.handleChange} type="password"/>
                    <Field name="telephone" label="Telephone" binding={this.handleChange}/>
                    <button type="submit" className="btn btn-success">
                        Register
                    </button>
                </form>
            </div>
        )
    }

    renderNotification() {
        if (!this.state.notification.text) {
            return null;
        }
        return (
            <div className={this.state.notification.type}>
                {this.state.notification.text}
            </div>
        )
    }
}
