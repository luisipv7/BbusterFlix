require('dotenv').config()
const app = require('./app')
const server = require('http').Server(app)
const port = process.env.PORT || 8086

server.listen(port);
