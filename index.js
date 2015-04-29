var Hapi = require('hapi');

// Create a server with a host and port
var server = new Hapi.Server();
server.connection({
  host: 'localhost',
  port: 8000
});

// Add the route
server.route({
  method: 'GET',
  path:'/markdown/get/{id}',
  handler: function (request, reply) {
    reply('Hello, ' + encodeURIComponent(request.params.id) + '!');

  }
});

server.route({
  method: 'POST',
  path:'/markdown/save',
  handler: function (request, reply) {
    reply('Your text is "' + request.payload.text + '"!');

  }
});

// Start the server
server.start(function () {
  console.log('Server running at:', server.info.uri);
});