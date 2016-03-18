import React from 'react';

import {Link} from 'react-router'

export default () => {
    return (
        <ul>
            <li><Link to="/">home</Link></li>
            <li><Link to="/register">register</Link></li>
            <li><Link to="/contacts">contacts</Link></li>
        </ul>
    )
}
