import React from 'react';
import Contact from '../../components/Contact';
import {iceContactRemove} from '../../lib/iceContacts/actions';


export default class Contacts extends React.Component {
    removeHandler(id) {
        let action = iceContactRemove(id);
        let result = this.props.dispatch(action);
    }
    handleCancellation(e) {
        e.preventDefault();
        history.back();
    }
    addHandler(e) {
        e.preventDefault();
        location.hash = '#/contactpicker'
    }
    render() {
        return (
            <section className="section contactsList">
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
                </div>
            </section>
        )
    }
    renderNotification() {
        return this.props.iceContacts.size ? '' :
        <div className="notification">
            <p>No contacts available. You can add one right now.</p>
            <p><button className="button is-success" onClick={this.addHandler.bind(this)}>add one</button></p>
        </div>;
    }
}
