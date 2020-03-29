let express = require('express')
let path = require('path')
let cookieParser = require('cookie-parser')
let logger = require('morgan')
let cors = require('cors')


let functionsRouter = require('./routes/wakeOnLanFunctions')


let app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())
app.use('/', functionsRouter)

app.get('/status', (req, res, next) => res.sendStatus(200));

module.exports = app