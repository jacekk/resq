import React from 'react';
import Circle from '../../components/Circle';
import TimePicker from '../../components/TimePicker';
import {pad} from '../../lib/helpers';
import moment from 'moment';

export default class Timer extends React.Component {
	constructor() {
		super();
		this.initialState = {
			started: false,
			percent: 100,
			mainText: 'Start',
			helpText: 'Click to start',
			hours: 1,
			minutes: 30
		};
		this.state = this.initialState;

		this.toogle = this.toogle.bind(this);
		this.timePickerChanged = this.timePickerChanged.bind(this);
	}

	toogle() {
		if (!this.state.started) {
			let {hours, minutes} = this.state;
			this.setState({
				started: true,
				percent: 1,
				mainText: `${hours}:${pad(minutes)}`,
				helpText: 'Click to end'
			});
		} else {
			this.setState(this.initialState);
		}
	}

	timePickerChanged(hours, minutes) {
		this.setState({hours, minutes});
	}

	render() {
		let bottom
		if (this.state.started) {
			bottom = (
				<div className="hGrid">
					<div className="hGrid-left">
						<button>+1h</button>
					</div>
					<div className="hGrid-right">
						<button>+10m</button>
					</div>
				</div>
			);
		} else {
			bottom = <TimePicker
					hours={this.state.hours}
					minutes={this.state.minutes}
					onChange={this.timePickerChanged}
				/>;
		}
		return (
			<div className="vGrid">
				<div className="vGrid-headerButtons">
					<div className="hGrid">
						<div className="hGrid-left">
							<img src="./svg/contacts.svg" />
						</div>
						<div className="hGrid-right">
							<img src="./svg/settings.svg" />
						</div>
					</div>
				</div>
				<div className="vGrid-timerCircle">
					<Circle
						onClick={this.toogle}
						percent={this.state.percent}
						main={this.state.mainText}
						help={this.state.helpText}
					/>
				</div>
				<div className="vGrid-footer">
					{bottom}
				</div>
			</div>
		)
	}
}
