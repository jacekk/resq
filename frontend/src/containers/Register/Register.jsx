import React from 'react';

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
                <h3>Register form</h3>
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
