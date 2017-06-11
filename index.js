const express = require('express')
const bodyParser = require('body-parser')

// app
const serverPort = process.env.PORT || 8080
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

app.listen(serverPort, console.log(`Listening on port ${serverPort}`))
