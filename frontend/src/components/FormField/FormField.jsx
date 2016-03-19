import React from 'react';

export default class FormField extends React.Component {
    render() {
        return (
            <span className="field">
	            <label className="field-label" htmlFor={this.props.name}>
	            	{this.props.label}:
            	</label>
	            <input
	                name={this.props.name}
	                type={this.props.type || 'text'}
	                onChange={this.props.binding}
                    className="field-input input"
	            />
	        </span>
        )
    }
}
