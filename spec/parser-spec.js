var Parser = require("../lib/parser");

var headers_test = {
  "#header1" : "<h1>header1</h1>",
  "##header2" : "<h2>header2</h2>",
  "###header3" : "<h3>header3</h3>",
  "######header6" : "<h6>header6</h6>",
  " #header1" : "<p> #header1</p>",
}

var paragraf_test = {
  "It is good test" : "<p>It is good test</p>",
}

var em_test = {
  "*test*" : "<p><em>test</em></p>",
  "*test* this test using *test*" : "<p><em>test</em> this test using <em>test</em></p>",
  //negative
  "*test" : "<p>*test</p>",
  "test**" : "<p>test**</p>",
}

var strong_test = {
  "**test**" : "<p><strong>test</strong></p>",
  "**test** this test using **test**" : "<p><strong>test</strong> this test using <strong>test</strong></p>",
  //negative
  "**test" : "<p>**test</p>",
}

var link_test = {
  "[example link](http://www.google.com)" : '<p><a href="http://www.google.com">example link</a></p>',
}

var big_text = [
  "#PromisePipe - reusable promise chains",
  "PromisePipe allows to build a reusable Promise chain with custom *API*.",
  "Promise **pipe** returns a function which you can call multiple times and each time all chains will be called.",
  "##Link",
  "[github link](https://github.com/edjafarov)"
  ];

var big_html = [
  "<h1>PromisePipe - reusable promise chains</h1>",
  "<p>PromisePipe allows to build a reusable Promise chain with custom <em>API</em>.</p>",
  "<p>Promise <strong>pipe</strong> returns a function which you can call multiple times and each time all chains will be called.</p>",
  "<h2>Link</h2>",
  '<p><a href="https://github.com/edjafarov">github link</a></p>'
];

describe("Headers", function () {
  it("should parse string and return headers (h1,h2,h3) tags", function () {
    for (var text in headers_test) {
      var html_check = headers_test[text];
      var html = Parser(text);

      expect(html).toBe(html_check);
    }
  });
});

describe("Paragraf", function () {
  it("should cover text lines to paragraphs <p>some text</p>", function () {
    for (var text in paragraf_test) {
      var html_check = paragraf_test[text];
      var html = Parser(text);

      expect(html).toBe(html_check);
    }
  });
});

describe("Emphasized", function () {
  it("should change text wrapped in *...* becomes emphasized <em>text</em>", function () {
    for (var text in em_test) {
      var html_check = em_test[text];
      var html = Parser(text);

      expect(html).toBe(html_check);
    }
  });
});

describe("Strong", function () {
  it("should change text wrapped in **...** becomes strong <strong>text</strong>", function () {
    for (var text in strong_test) {
      var html_check = strong_test[text];
      var html = Parser(text);

      expect(html).toBe(html_check);
    }
  });
});

describe("Links", function () {
  it("should parse text like [example link](http://www.google.com) to link <a href='http://www.google.com'>example link</a>", function () {
    for (var text in link_test) {
      var html_check = link_test[text];
      var html = Parser(text);

      expect(html).toBe(html_check);
    }
  });
});

describe("Full text", function () {
  it("should parse big text", function () {
    var html_check = big_html.join('');
    var html = Parser(big_text.join('\n'));

    expect(html).toBe(html_check);
  });
});

