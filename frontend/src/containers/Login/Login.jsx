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
                </div>
            </section>
        )
    }
}
