var Parser = require("../lib/parser");

var headers_test = {
  "#header1" : "<h1>header1</h1>",
  "##header2" : "<h2>header2</h2>",
  "###header3" : "<h3>header3</h3>",
  "######header6" : "<h6>header6</h6>",
}





var stringP = "paragraf";
var stringEm = "*now*";
var stringEm2 = "*now* is now but is not *now*";
var stringStrong = "**now**";
var stringStrong2 = "**now** is now but is not **now**";


describe("headers", function () {
  it("should parser string and return headers (h1,h2,h3) tags", function () {
    for (var text in headers_test) {
      var html_check = headers_test[text];
      var html = Parser(text);
      
      expect(html).toBe(html_check);
    }
  });
});