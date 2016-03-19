import React from 'react';

export default class FormField extends React.Component {
    render() {
        return (
            <div className="input-wrapper">
	            <label htmlFor={this.props.name}>
	            	{this.props.label}:
            	</label>
	            <input
	                name={this.props.name}
	                type={this.props.type || 'text'}
	                onChange={this.props.binding}
	            />
	        </div>
        )
    }
}
