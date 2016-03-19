import React from 'react';
import Circle from '../../components/Circle';
import TimePicker from '../../components/TimePicker';
import {pad} from '../../lib/helpers';

const REFRESH_RATE = 1000;
const MILISECONDS = 1000;
const ADDITIONAL_HOUR = 60;
const ADDITIONAL_MINUTES = 10;

import * as actions from '../../lib/timer/actions';
export default class Timer extends React.Component {
	constructor(state, props) {
		super();
		this.initialState = {
			mainText: 'Start',
			helpText: 'Click to start'
		};

		this.state = this.initialState;

		this.toogle = this.toogle.bind(this);
		this.timePickerChanged = this.timePickerChanged.bind(this);
	}

    componentDidMount() {
        this.props.dispatch(actions.timerInit());
    }

    componentWillUnmount() {
    }

    clearClock() {
        clearInterval(this.tid);
    }

    updateClock() {
        let minutes = this.props.timer.get('minutes');

        minutes -= REFRESH_RATE / MILISECONDS;

        if (minutes <= 0) {
            this.clearClock();
            this.props.dispatch(actions.timerEnded());
        } else {
            this.props.dispatch(actions.timerUpdate(minutes));
        }
    }

	toogle() {
        let self = this;
		if (!this.props.timer.get('started')) {
            this.tid = setInterval(() => {
                if (this.props.timer.get('started')) {
                    self.updateClock(REFRESH_RATE);
                }
            }, REFRESH_RATE)
            this.props.dispatch(actions.timerStart());

		} else {
            this.clearClock();
            this.props.dispatch(actions.timerStop());
		}
	}

	timePickerChanged(hours, minutes) {
        this.props.dispatch(actions.timerUpdate(hours * 60 + minutes));
	}

    addHours(e) {
        e.preventDefault();
        let minutes = +this.props.timer.get('minutes');
        this.props.dispatch(actions.timerAdditionalUpdate(minutes + ADDITIONAL_HOUR ));
    }

    addMinutes(e) {
        e.preventDefault();
        let minutes = +this.props.timer.get('minutes');
        this.props.dispatch(actions.timerAdditionalUpdate(minutes + ADDITIONAL_MINUTES ));
    }

	render() {
		let bottom;
        let fullminutes = this.props.timer.get('minutes');
        let minutes = fullminutes % 60;
        let hours = Math.floor(fullminutes / 60);
        let percent = (this.props.timer.get('percent')-100)*-1;
        let started = this.props.timer.get('started');
        let ended = this.props.timer.get('ended');
        let mainText;
        let helpText;

		if (ended) {
            mainText = 'Alert';
            helpText = 'Help message was sended';
			percent = 100;
		} else if (started) {
			bottom = (
				<div className="hGrid">
					<div className="hGrid-left">
						<button className="button" onClick={this.addHours.bind(this)}>+1h</button>
					</div>
					<div className="hGrid-right">
						<button className="button" onClick={this.addMinutes.bind(this)}>+10m</button>
					</div>
				</div>
			);
            mainText = `${hours}:${pad(minutes)}`;
            helpText = 'Click to end';
		} else {
			percent = -100;
			bottom = <TimePicker
				hours={hours}
				minutes={minutes}
				onChange={this.timePickerChanged}
			/>;

            mainText = 'Start';
            helpText = 'Click to start';
       }
		return (
			<div className="vGrid section">
				<div className="vGrid-headerButtons">
					<div className="hGrid">
						<div className="hGrid-left">
							<a href="#/contacts">
								<img src="./svg/contacts.svg" />
							</a>
						</div>
						<div className="hGrid-right">
							<a>
								<img src="./svg/settings.svg" style={{opacity: 0.2}} />
							</a>
						</div>
					</div>
				</div>
				<div className="vGrid-timerCircle">
					<Circle
						onClick={this.toogle}
						percent={percent}
						main={mainText}
						help={helpText}
					/>
				</div>
				<div className="vGrid-footer">
					{bottom}
				</div>
			</div>
		)
	}
}
