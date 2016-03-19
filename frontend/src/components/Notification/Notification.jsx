import React from 'react';
import {NOTIFY_ERROR, NOTIFY_INFO, NOTIFY_SUCCESS} from '../../lib/constants';

export default (props) => {
    if (!props.text) {
        return <div/>;
    }
    let className = 'notification ' + props.type;
    return (
        <div className={className}>
            {props.text}
        </div>
    );
}
