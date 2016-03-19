import React from 'react';

import Menu from '../../menu';
import {contactsRequest} from '../../lib/request/actions';
import Notification from '../../components/Notification';

export default class App extends React.Component {
    componentDidMount() {
        this.props.dispatch(contactsRequest());
    }

    render() {
        return (
            <div className="maxHeight">
                <Menu />
                <Notification config={this.props.notification.toJS()}/>
                {this.props.children}
            </div>
        )
    }
}
