import React from 'react';

import {Circle} from 'rc-progress';

import "!style!css!less!./circle.less";

export default (props) => {
    return (
        <div className="circle" onClick={props.onClick}>
            <div className="circle-progress">
                <Circle
                    percent={props.percent}
                    strokeWidth="2"
                    strokeColor="#ed7d2c"
                    trailColor="#000000"
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
