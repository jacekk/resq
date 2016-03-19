import React from 'react';
import {Circle} from 'rc-progress';

import "!style!css!less!./circle.less";

const COLORS = [
    '#CED900',
    '#ED7D2C',
    '#F23300'
]

export default (props) => {
    let color = COLORS[0];

    if (props.percent > 50) {
        color = COLORS[1];
    }

    if (props.percent > 75) {
        color = COLORS[2];
    }
    return (
        <div className="circle" onClick={props.onClick}>
            <div className="circle-progress">
                <Circle
                    percent={props.percent}
                    strokeWidth="1"
                    strokeColor={color}
                    trailColor="#222222"
                />
            </div>
            <div className="circle-text">
                <div className="circle-clock">
                    {props.main}
                </div>
                <small className="circle-info">
                    {props.help}
                </small>
            </div>
        </div>
    )
}
