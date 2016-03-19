import React from 'react';

import "!style!css!less!./contact.less";

export default class Contact extends React.Component {
    render() {
        return (
            <li className="contact" onClick={this.selectHandler.bind(this)}>
                <strong className="contact-name">{this.props.name}</strong>
                <div className="contact-telephone">
                    {this.props.telephone}
                </div>
                <a
                    onClick={this.removeHandler.bind(this)}
                >
                    <img className="contact-remove" src="./svg/remove.svg" alt="remove"/>
                </a>
            </li>
        )
    }

    removeHandler(e) {
        e.preventDefault();
        if (typeof this.props.onRemove === 'function') {
            this.props.onRemove(this.props.id);
        }
    }

    selectHandler(e) {
        e.preventDefault();
        if (typeof this.props.onSelect === 'function') {
            this.props.onSelect(this.props);
        }
    }

}
