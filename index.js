exports.register = function (server, options, next) {

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

  next();
};

exports.register.attributes = {
  pkg: require('./package.json')
};