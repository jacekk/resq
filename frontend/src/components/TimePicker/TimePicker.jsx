import React from 'react';

import "!style!css!less!./timePicker.less";

const HOURS_STEP = 1;
const MINUTES_STEP = 10;

function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}

export default class TimePicker extends React.Component {
	constructor() {
		super();
		this.state = {
			hours: 0,
			minutes: 0
		};

        this.incHours = this.incHours.bind(this);
        this.decHours = this.decHours.bind(this);
        this.incMinutes = this.incMinutes.bind(this);
        this.decMinutes = this.decMinutes.bind(this);
	}

    incHours() {
        this.setState({
            hours: this.state.hours + HOURS_STEP
        });
    }

    decHours() {
        this.setState({
            hours: this.state.hours - HOURS_STEP
        });
    }

    incMinutes() {
        this.setState({
            minutes: this.state.minutes + MINUTES_STEP
        });
    }

    decMinutes() {
        this.setState({
            minutes: this.state.minutes - MINUTES_STEP
        });
    }

    render() {
        return (
            <div className="timePicker">
                <div className="timePicker-field">
                    <button onClick={this.incHours} className="timePicker-button">+</button>
                    <div className="timePicker-number">
                        {pad(this.state.hours, 2)}
                    </div>
                    <button onClick={this.decHours} className="timePicker-button">-</button>
                </div>
                <div className="timePicker-separator">
                    :
                </div>
                <div className="timePicker-field">
                    <button onClick={this.incMinutes} className="timePicker-button">+</button>
                    <div className="timePicker-number">
                        {pad(this.state.minutes, 2)}
                    </div>
                    <button onClick={this.decMinutes} className="timePicker-button">-</button>
                </div>
	        </div>
        )
    }
}
