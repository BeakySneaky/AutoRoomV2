let webSocketsServerPort = 3002
let webSocketServer = require('websocket').server
let http = require('http')
let wol = require('node-wol')
// Spinning the http server and the websocket server.
let server = http.createServer()
server.listen(webSocketsServerPort, () => {
	console.log('Server running on port ' + webSocketsServerPort)
})

let wsServer = new webSocketServer({
	httpServer: server,
})

// I'm maintaining all active connections in this object
let clients = []

wsServer.on('request', function (request) {
	//let userID = getUniqueID()
	//let userID = "user" + clients.length + 1
	//console.log(userID)
	console.log(new Date() + ' Recieved a new connection from origin ' + request.origin + '.')
	let connection = request.accept(null, request.origin)
	//clients[userID] = connection
	let index = clients.push(connection) - 1;
	console.log('connected: ' + index + ' in ' + Object.getOwnPropertyNames(clients))
	connection.on('message', function (message) {
		if (message.type === 'utf8') {
			switch (message.utf8Data) {
				case 'WOL':
					wol.wake('30-9C-23-02-C8-AB', function(error){
						if(error){
							console.log('error')
						}else{
							console.log('success.... For now.')
							connection.sendUTF("WOL_Success")
						}
					})
					break
				default:
			}
		}
	})

	connection.on('close', function(){
		console.log((new Date())+ " Peer " + index + " disconnected.")
		clients.splice(index, 1);

	})
})
