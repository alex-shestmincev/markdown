function headerParser(line){
  var headerReg = /#/g;
  var matches = line.match(headerReg);

  if (matches){

    hN = matches.length;
    line = line.replace(matches.join(''),"<h" + hN + ">") + "</h" + hN + ">";
  }
  return line;
}

function emParser(line){
  function replacer(str, sub, offset, s) {
    var res = "<em>" + sub + "</em>";
    return res;
  }

  var emrReg = /\*(\w+)\*/g;
  line = line.replace(emrReg, replacer);

  return line;
}

function strongParser(line){
  function replacer(str, sub, offset, s) {
    var res = "<strong>" + sub + "</strong>";
    return res;
  }

  var emrReg = /\*{2}(\w+)\*{2}/g;
  line = line.replace(emrReg, replacer);

  return line;
}




var parser = function(text){
  var html = text;
  html = headerParser(html);
  html = emParser(html);
  html = strongParser(html);

  return html;
}

module.exports = parser;