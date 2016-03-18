import React from 'react';

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
                <h3>Register page</h3>
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
                    <div className="input-wrapper">
                        <label htmlFor="password">Telephone:</label>
                        <input
                            name="telephone"
                            type="text"
                            value={this.state.telephone}
                            onChange={this.handleChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-success">
                        Register
                    </button>
                </form>
            </div>
        )
    }
}
