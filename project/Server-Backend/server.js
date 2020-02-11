const http = require('http');
const port = process.env.PORT || 8080;
const app = require('./app');

const server = http.createServer(app);

// start the server -> it will start to listen on the port: 8080
server.listen(port);