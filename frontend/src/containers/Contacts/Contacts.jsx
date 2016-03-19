import React from 'react';
import Contact from '../../components/Contact';
import {iceContactRemove} from '../../lib/iceContacts/actions';

export default class Contacts extends React.Component {
    removeHandler(id) {
        let action = iceContactRemove(id);
        let result = this.props.dispatch(action);
    }
    render() {
        return (
            <section className="section">
                <div className="content">
                    <h2>Contacts</h2>
                    <ul>
                        {this.props.iceContacts.map(contact => {
                            let obj = contact.toJS();
                            return <Contact key={obj.id} id={obj.id} name={obj.name} telephone={obj.telephone} onRemove={this.removeHandler.bind(this)}/>
                        })}
                    </ul>
                </div>
            </section>
        )
    }
}
