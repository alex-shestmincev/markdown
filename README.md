# markdown
Module to parce string to html

## Installing
npm install github:klik1301/markdown --save

## register in your index.js

server.register([
  {
    register: require('markdown'),
    options: {} // options for 'markdown'
  }
], function (err) {
  if (err) {
    console.error('Failed to load a plugin:', err);
  }
});
