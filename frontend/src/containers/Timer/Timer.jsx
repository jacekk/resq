import React from 'react';
import Circle from '../../components/Circle';
import TimePicker from '../../components/TimePicker';

export default class Timer extends React.Component {
	constructor() {
		super();
		this.state = {
			started: false,
			percent: 100,
			mainText: 'Start',
			helpText: 'Click to start'
		};

		this.toogle = this.toogle.bind(this);
	}

	toogle() {
		if (!this.state.started) {
			this.setState({
				started: false,
				percent: 1,
				mainText: '2:30',
				helpText: 'Click to end'
			});
			setInterval(function () {
				this.setState({
					percent: this.state.percent + 1
				});
			}.bind(this), 1000);
		}
	}

	render() {
		return (
			<div>
				<Circle
					onClick={this.toogle}
					percent={this.state.percent}
					main={this.state.mainText}
					help={this.state.helpText}
				/>
				<TimePicker />
			</div>
		)
	}
}
