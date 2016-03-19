import React from 'react';
import {NOTIFY_ERROR, NOTIFY_INFO, NOTIFY_SUCCESS} from '../../lib/constants';

export default (props) => {
    if (!props.text) {
        return <div/>;
    }

    let isType;

    switch (props.type) {
        case NOTIFY_ERROR:
            isType = 'is-danger';
            break;
        case NOTIFY_SUCCESS:
            isType = 'is-success';
            break;
        case NOTIFY_INFO:
            isType = 'is-info';
            break;
    }

    let className = 'notification ' + isType;
    return (
        <div className={className}>
            {props.text}
        </div>
    );
}
