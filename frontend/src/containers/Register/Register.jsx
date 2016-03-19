import React from 'react';
import {userCreate} from '../../lib/user/actions';
import {NOTIFY_ERROR, NOTIFY_INFO, NOTIFY_SUCCESS} from '../../lib/constants';

import Field from '../../components/FormField';
import Notification from '../../components/Notification';

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
        let {text, type} = this.state.notification;
        return (
            <div>
                <h3>Register form</h3>
                <Notification text={text} type={type}/>
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
}
