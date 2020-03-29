import React from 'react'
import './SnackBar.css'

export default class SnackBar extends React.Component {
	render() {
		return <div id="snackbar" className="show">{this.props.text}</div>
	}
}
