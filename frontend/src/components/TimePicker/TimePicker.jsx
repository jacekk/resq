import React from 'react';
import {pad} from '../../lib/helpers';

import "!style!css!less!./timePicker.less";

const HOURS_STEP = 1;
const MINUTES_STEP = 10;

export default class TimePicker extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hours: props.hours,
			minutes: props.minutes
		};

        this.incHours = this.incHours.bind(this);
        this.decHours = this.decHours.bind(this);
        this.incMinutes = this.incMinutes.bind(this);
        this.decMinutes = this.decMinutes.bind(this);
	}

    incHours() {
        this.change('hours', +HOURS_STEP);
    }

    decHours() {
        this.change('hours', -HOURS_STEP);
    }

    incMinutes() {
        this.change('minutes', +MINUTES_STEP);
    }

    decMinutes() {
        this.change('minutes', -MINUTES_STEP);
    }

    change(what, num) {
        this.state[what] = this.state[what] + num;
        let {hours, minutes} = this.state;
        if (minutes > 59) {
            minutes = 0;
            hours++;
        }
        if (minutes < 0) {
            if (hours > 0) {
                minutes = 60 - MINUTES_STEP;
                hours--;
            } else {
                minutes = 0;
            }
        }
        if (hours < 0) {
            hours = 0;
        }
        this.setState({hours, minutes});
        this.props.onChange(hours, minutes);
    }

    render() {
        return (
            <div className="timePicker">
                <div className="timePicker-field">
                    <button onClick={this.incHours} className="timePicker-button">+</button>
                    <div className="timePicker-number">
                        {pad(this.state.hours)}
                    </div>
                    <button onClick={this.decHours} className="timePicker-button">-</button>
                </div>
                <div className="timePicker-separator">
                    :
                </div>
                <div className="timePicker-field">
                    <button onClick={this.incMinutes} className="timePicker-button">+</button>
                    <div className="timePicker-number">
                        {pad(this.state.minutes)}
                    </div>
                    <button onClick={this.decMinutes} className="timePicker-button">-</button>
                </div>
	        </div>
        )
    }
}
