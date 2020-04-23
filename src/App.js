import React from 'react'
import SnackBar from './SnackBar'
import './App.css'
import { w3cwebsocket as WebSocket } from 'websocket'

export default class App extends React.Component {
	constructor() {
		super()
		this.state = {
			SnackBarOn: false,
			SnackBarText: null,
			WakeOnLanAvailable: false,
			Ws: null,
		}
	}

	componentDidMount() {
		this.connect()
	}

	connect = () => {
		var ws = new WebSocket('ws://127.0.0.1:3002')
		let that = this
		var connectInterval

		// websocket onopen event listener
		ws.onopen = () => {
			console.log('Connected Websocket to Server')
			this.setState({ WakeOnLanAvailable: true })
			this.setState({ ws: ws })

			that.timeout = 250
			clearTimeout(connectInterval)
		}
		ws.onmessage = (evt) => {
			// listen to data sent from the websocket server
			const message = evt.data
			if(message === "WOL_Success"){
				this.sendSnackBar('WOL request sent !')
			}
			console.log(message)
		}

		// websocket onclose event listener
		ws.onclose = (e) => {
			this.setState({ WakeOnLanAvailable: false })
			console.log(
				`Socket is closed. Attempt to reconnect in ${Math.min(
					10000 / 1000,
					(that.timeout + that.timeout) / 1000
				)} second.`,
				e.reason
			)

			that.timeout = that.timeout + that.timeout //increment retry interval
			connectInterval = setTimeout(this.check, Math.min(10000, that.timeout)) //call check function after timeout
		}

		// websocket onerror event listener
		ws.onerror = (err) => {
			console.error('Socket encountered error: ', err.message, 'Closing socket')

			ws.close()
		}
	}

	check = () => {
		const { ws } = this.state
		if (!ws || ws.readyState === WebSocket.CLOSED) this.connect() //check if websocket instance is closed, if so call `connect` function.
	}

	wol = () => {
		const { ws } = this.state
		ws.send('WOL')
		//this.sendSnackBar('WOL request sent !')
	}

	sendSnackBar = (message) => {
		setTimeout(() => {
			this.setState({ SnackBarOn: false })
		}, 3000)
		this.setState({ SnackBarOn: true, SnackBarText: message })
	}

	render() {
		if (this.state.WakeOnLanAvailable === true) {
			return (
				<div>
					<button onClick={this.wol}>Wake On Lan</button>
					{this.state.SnackBarOn === true ? (
						<SnackBar text={this.state.SnackBarText} />
					) : (
						''
					)}
				</div>
			)
		} else {
			return null
		}
	}
}
