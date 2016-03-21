import React from 'react';

// Dev menu:
// import Menu from '../../menu';
// <Menu />

import Notification from '../../components/Notification';

export default class App extends React.Component {
    render() {
        return (
            <div className="maxHeight">
                <Notification config={this.props.notification.toJS()}/>
                {this.props.children}
            </div>
        )
    }
}
