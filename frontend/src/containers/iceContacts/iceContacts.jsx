import React from 'react';
import Contact from '../../components/Contact';
import {iceContactRemove, iceContactCreate} from '../../lib/iceContacts/actions';
import {contactsRequest} from '../../lib/request/actions';
import {notify} from '../../lib/notification/actions';
import {NOTIFY_ERROR} from '../../lib/constants';
import uuid from 'node-uuid';

export default class Contacts extends React.Component {

    componentDidMount() {
        this.props.dispatch(contactsRequest());
    }

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
            <section className="section" id="iceContacts">
                <div className="content">
                    <a href="#/timer" className="topIcon topIcon--left" onClick={this.handleCancellation.bind(this)}>
                        <img src="./svg/back.svg"/>
                    </a>
                    <div className="alignCenter">
                        <img src="./svg/contactsLarge.svg"/>
                        <h2>Contacts</h2>
                    </div>
                    <ul className="contactWrapper">
                        {this.props.iceContacts.map(contact => {
                            let obj = contact.toJS();
                            return <Contact key={obj.id} id={obj.id} name={obj.name} telephone={obj.telephone} onRemove={this.removeHandler.bind(this)}/>
                        })}
                    </ul>
                    {this.renderNotification()}
                    <p className="alignCenter">
                        <button id="bigFatAdd" className="button button--success" onClick={this.addHandler.bind(this)}>
                            Add contact
                        </button>
                    </p>
                </div>
            </section>
        )
    }
    renderNotification() {
        return this.props.iceContacts.size ? '' :
        <div className="notification notification--static">
            <p>No contacts available. You can add one right now.</p>
        </div>;
    }
}
