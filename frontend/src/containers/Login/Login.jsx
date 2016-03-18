import React from 'react';

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
                    <div className="input-wrapper">
                        <label htmlFor="email">Email:</label>
                        <input
                            name="email"
                            type="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password:</label>
                        <input
                            name="password"
                            type="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-success">
                        Log in
                    </button>
                </form>
            </div>
        )
    }
}
