import React from 'react';

import Field from '../../components/FormField';

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
        console.log('submitted:', this.state);
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
                <h3>Login form</h3>
                <form onSubmit={this.onSubmit}>
                    <Field name="email" label="Email" binding={this.handleChange} type="email"/>
                    <Field name="password" label="Password" binding={this.handleChange} type="password"/>
                    <button type="submit" className="btn btn-success">
                        Log in
                    </button>
                </form>
            </div>
        )
    }
}
