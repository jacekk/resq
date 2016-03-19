import React from 'react';
import Circle from '../../components/Circle';

export default class Timer extends React.Component {
	render() {
		return (
			<div>
				<Circle
					percent="50"
					time="2:45"
					help="Click to start"
				/>
			</div>
		)
	}
}
