const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
dotenv.load()

// app
const serverPort = process.env.OPENSHIFT_NODEJS_PORT || 8080
const serverIpAddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('public'))

// require in routes
const mainRoute = require('./server/routes/main')
const apiRoutes = require('./server/routes/api/index')

// routes
app.use('/', mainRoute)
app.use('/api', apiRoutes)

// basic error handling
app.use((err, req, res, next) => {
  console.log(err)
})

app.listen(serverPort, serverIpAddress, console.log(`Listening on ${serverIpAddress} port ${serverPort}`))
