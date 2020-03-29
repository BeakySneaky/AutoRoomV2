import React from 'react'
import SnackBar from './SnackBar'
import './App.css'

export default class App extends React.Component {
	constructor() {
		super()
		this.state = {
			SnackBarOn: false,
			SnackBarText: null
		}
	}

	render() {
		if(this.getExpressServerStatus() === 200){
		return (
			<div>
				<button onClick={this.wol}>Wake On Lan</button>
				{this.state.SnackBarOn === true ? <SnackBar text={this.state.SnackBarText} /> : ''}
			</div>
		)
		}else{
			return (null)
		}
	}

	wol = () => {
		fetch('http://localhost:3002/WOL', {
			method: 'POST'
		}).then(() => {
			this.sendSnackBar('WOL request sent !')
		})
	}

	getExpressServerStatus = () => {
		fetch('http://localhost:3002/status', {
			method: 'GET'
		})
			.then((response) => {
				console.log(response)
				return response.status
			})
			.catch((err) => {
				console.log(err)
			})
	}

	sendSnackBar = (message) => {
		setTimeout(() => {
			this.setState({ SnackBarOn: false })
		}, 3000)
		this.setState({ SnackBarOn: true, SnackBarText: message })
	}
}
