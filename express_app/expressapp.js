let express = require('express')
let socket = require('socket.io')
let http = require('http')
let path = require('path')
let cookieParser = require('cookie-parser')
let logger = require('morgan')
let cors = require('cors')


let functionsRouter = require('./routes/wakeOnLanFunctions')


let app = express()
let server = http.createServer(app)
let io = socket(server)

//Socket.io manips

io.on('connection', socket => {
	console.log("Client connected" + socket.id)
	console.log(socket)
})

//

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())
app.use('/', functionsRouter)

app.get('/status', (req, res, next) => res.sendStatus(200));


module.exports = app