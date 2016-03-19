import React from 'react';
import {NOTIFY_ERROR, NOTIFY_INFO, NOTIFY_SUCCESS} from '../../lib/constants';

export default (props) => {
    const config = props.config;

    if (!config.msg || !config.show) {
        return <div/>;
    }

    let type = '';
    let icon = '';

    switch (config.type) {
        case NOTIFY_ERROR:
            type = 'notification--danger';
            icon = <img className="notification-icon" src="./svg/alert.svg"/>;
            break;
        case NOTIFY_SUCCESS:
            type = 'notification--success';
            break;
        case NOTIFY_INFO:
            type = 'notification--info';
            break;
    }

    let className = 'notification ' + type;
    return (
        <div className={className}>
            {icon} {config.msg}
        </div>
    );
}
