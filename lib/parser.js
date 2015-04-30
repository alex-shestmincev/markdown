function headerParser(line){
  var headerReg = /^##*/g;
  var matches = line.match(headerReg);

  if (matches){
    hN = matches[0].length;
    line = line.replace(matches.join(''),"<h" + hN + ">") + "</h" + hN + ">";
  }
  return line;
}

function paragraphParser(line){
  var headerReg = /<h\d>.+<\/h\d>/;
  var matches = line.match(headerReg);

  if (!matches){ // if this is no headers tags
    line = "<p>" + line + "</p>";
  }
  return line;
}

function emParser(line){
  function replacer(str, sub, offset, s) {
    var res = "<em>" + sub + "</em>";
    return res;
  }

  var emrReg = /\*{1}(\w+)\*{1}/g;
  line = line.replace(emrReg, replacer);

  return line;
}

function strongParser(line){
  function replacer(str, sub, offset, s) {
    var res = "<strong>" + sub + "</strong>";
    return res;
  }

  var strongReg = /\*{2}(\w+)\*{2}/g;
  line = line.replace(strongReg, replacer);

  return line;
}

function linkParser(line){
  function replacer(str, title, link_href) {
    var res = '<a href="' + link_href + '">' + title + "</a>";
    return res;
  }

  var linkReg = /\[(.+)\]\(((https?:\/\/)?(www\.)?([-а-яa-zёЁцушщхъфырэчстью0-9_\.]{2,}\.)(рф|[a-z]{2,6})((\/[-а-яёЁцушщхъфырэчстьюa-z0-9_]{1,})?\/?([a-z0-9_-]{2,}\.[a-z]{2,6})?(\?[a-z0-9_]{2,}=[-0-9]{1,})?((\&[a-z0-9_]{2,}=[-0-9]{1,}){1,})?))\)/gi;
  line = line.replace(linkReg, replacer);

  return line;
}




var parser = function(text){
  var html='';

  //parcer lines
  var lines = text.split('\n');
  for(var i = 0;i < lines.length;i++){
    var line = lines[i] ? lines[i] : '' ;

    line = headerParser(line);
    line = paragraphParser(line);
    html += line;
  }


  //parcer text
  html = strongParser(html);
  html = emParser(html);
  html = linkParser(html);


  return html;
}

module.exports = parser;