
var headersReg = /#/;

var parser = function(text){
  if (text.match(headersReg)){
    return "<h1>" + text + "</h1>";
  }

  return "<b>" + text + "</b>";
}

module.exports = parser;