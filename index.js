var async = require('async');
var htmlDb = require('./models/htmldb').htmldb;
var Boom = require('boom');
var Parser = require('./lib/parser');

function parce(text,callback){
  //TODO
  var html = Parser(text);
  //
  return callback(null, text, html);
}

function saveHtml(text, html, callback){
  htmlDb.saveHtml(text, html, callback);
}

function getHtml(id,callback){
  htmlDb.getHtml(id, callback);
}



exports.register = function (server, options, next) {

  server.route({
    method: 'GET',
    path:'/markdown/get/{id}',
    handler: function (request, reply) {

      var id = request.params.id;
      async.waterfall([
        function(callback){
          getHtml(id,callback);
        },
        function(obj,callback){
          if (obj) {
            reply('Result is: "' + obj + '"!');
          }
        }
      ], function(err,result){
        if (err){
          return reply(Boom.notFound(err));
        }
      });
    }
  });

  server.route({
    method: 'POST',
    path:'/markdown/save',
    handler: function (request, reply) {
      var text = request.payload.text;

        async.waterfall([
          function(callback){
            parce(text, callback);
          },
          function(text, html, callback){
            saveHtml(text, html,callback);
          }
        ], function(err,result){
          if (err){
            reply('Your during save: "' + err + '"!');
          }
          console.log(result);
          reply('Result is: "' + result + '"!');
        }
      );



    }
  });

  next();
};

exports.register.attributes = {
  pkg: require('./package.json')
};