import React from 'react';

export default class Contact extends React.Component {
    render() {
        return (
            <li>
                <strong>{this.props.name}</strong>
                {this.props.telephone}
                {this.renderButton()}
            </li>
        )
    }

    removeHandler(e) {
        e.preventDefault();
        if (typeof this.props.onRemove === 'function') {
            this.props.onRemove(this.props.id, 'wtf', this.props);
        }
    }

    renderButton() {
        if (typeof this.props.onRemove !== 'function') {
            return;
        }
        return <button className="button is-danger" onClick={this.removeHandler.bind(this)}>usuń</button>;
    }
}
