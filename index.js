var async = require('async');
var htmlDb = require('./models/htmldb').htmldb;
var Boom = require('boom');
var Parser = require('./lib/parser');

function parce(text,callback){
  var html = Parser(text);
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
            reply(obj);
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
            if (!text) return callback("Empty post data");
            parce(text, callback);
          },
          function(text, html, callback){
            saveHtml(text, html,callback);
          },
          function(result,callback){
            if (result) reply(result);
          }
        ], function(err,result){
          if (err){
            reply(Boom.notFound(err));
          }

        }
      );



    }
  });

  next();
};

exports.register.attributes = {
  pkg: require('./package.json')
};