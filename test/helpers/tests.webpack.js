require('./phantomjs-shims.js');

var context = require.context('../spec', true, /Test\.js$/);
context.keys().forEach(context);