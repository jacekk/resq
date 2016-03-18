import React from 'react';

import Menu from '../../menu';

export default class App extends React.Component {
    render() {
        return (
            <div>
                <h1>ResQ</h1>
                <Menu />
                {this.props.children}
            </div>
        )
    }
}
