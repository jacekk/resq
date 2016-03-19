import React from 'react';

import Menu from '../../menu';
import Notification from '../../components/Notification';

export default class App extends React.Component {
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
