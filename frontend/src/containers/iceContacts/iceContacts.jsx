import React from 'react';
import Contact from '../../components/Contact';
import {iceContactRemove, iceContactCreate} from '../../lib/iceContacts/actions';
import {notify} from '../../lib/notification/actions';
import {NOTIFY_ERROR} from '../../lib/constants';
import uuid from 'node-uuid';


export default class Contacts extends React.Component {
    removeHandler(id) {
        let action = iceContactRemove(id);
        let result = this.props.dispatch(action);
    }

    handleCancellation(e) {
        e.preventDefault();
        history.back();
    }

    onContactsSuccess(contact) {
        let id = uuid.v4();
        let name = contact.displayName;
        let telephone = contact.phoneNumbers && contact.phoneNumbers[0] && contact.phoneNumbers[0].value;
        let action = iceContactCreate(id, name, telephone);
        this.props.dispatch(action);
    }

    onContactsError() {
        this.dispatch(notify(NOTIFY_ERROR, 'Unknown error'));
    }

    addHandler(e) {
        e.preventDefault();
        navigator.contacts.pickContact(this.onContactsSuccess.bind(this), this.onContactsError.bind(this));
    }

    render() {
        return (
            <section className="section contactsList" id="iceContacts">
                <div className="content">
                    <header className="mobileHeader">
                        <button className="button" onClick={this.handleCancellation.bind(this)}>
                            <i className="fa fa-arrow-left"></i>
                        </button>
                        <h2>Contacts</h2>
                    </header>
                    <ul>
                        {this.props.iceContacts.map(contact => {
                            let obj = contact.toJS();
                            return <Contact key={obj.id} id={obj.id} name={obj.name} telephone={obj.telephone} onRemove={this.removeHandler.bind(this)}/>
                        })}
                    </ul>
                    {this.renderNotification()}
                    <button id="bigFatAdd" className="button is-success" onClick={this.addHandler.bind(this)}>
                        <i className="fa fa-plus"></i>
                    </button>
                </div>
            </section>
        )
    }
    renderNotification() {
        return this.props.iceContacts.size ? '' :
        <div className="notification">
            <p>No contacts available. You can add one right now.</p>
        </div>;
    }
}
