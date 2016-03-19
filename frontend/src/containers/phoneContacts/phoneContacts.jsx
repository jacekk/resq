import React from 'react';
import Contact from '../../components/Contact';
import uuid from 'node-uuid';
import {phoneContactCreate} from '../../lib/phoneContacts/actions';
import {iceContactCreate} from '../../lib/iceContacts/actions';
import {RouterContext} from 'react-router'

function getInitialState() {
    return {
        contacts: [],
        request: true
    }
}

export default class Contacts extends React.Component {
    constructor() {
        super();
        this.state = getInitialState();
    }
    componentDidMount() {
        let results = [], self = this, id = 0;
        if (navigator.contacts) {
            navigator.contacts.find([
                '*'
            ], function (contacts){
                if (contacts && self.state.request) {
                    results = contacts.map(contact => ({
                        id: id++,
                        name: contact.displayName,
                        telephone: contact.phoneNumbers && contact.phoneNumbers[0] && contact.phoneNumbers[0].value
                    })).filter(contact => contact.name && contact.telephone);
                    self.setState({
                        request: false,
                        contacts: results
                    });
                }
            }, function () {
                console.log('contacts:error', arguments);
            });
        }
    }

    componentWillUnmount() {
        this.setState({
            request: false
        });
    }

    handleSelect({name, telephone}) {
        let id = uuid.v4();
        let action = iceContactCreate(id, name, telephone);
        let results = this.props.dispatch(action);
        history.back();
    }

    handleCancellation(e) {
        e.preventDefault();
        history.back();
    }

    render() {
        let preloader;

        if (this.state.request) {
            preloader = <div className="staticPreloader">
                <span/>
                <span/>
                <span/>
            </div>
        }

        return (
            <section className="section contactsList">
                <div className="content">
                    <header className="mobileHeader">
                        <button className="button" onClick={this.handleCancellation.bind(this)}>
                            <i className="fa fa-arrow-left"></i>
                        </button>
                        <h2>Choose contact</h2>
                    </header>
                    {preloader}
                    <ul>
                        {this.state.contacts.map(contact => <Contact key={contact.id}
                                            name={contact.name} telephone={contact.telephone}
                                            onSelect={this.handleSelect.bind(this)}/>
                        )}
                    </ul>
                </div>
            </section>
        )
    }
}
