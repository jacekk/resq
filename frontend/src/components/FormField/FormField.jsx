import React from 'react';

export default class FormField extends React.Component {
    render() {
        return (
            <span className="input-wrapper">
	            <label className="label" htmlFor={this.props.name}>
	            	{this.props.label}:
            	</label>
	            <input
	                name={this.props.name}
	                type={this.props.type || 'text'}
	                onChange={this.props.binding}
                    className="input"
	            />
	        </span>
        )
    }
}
