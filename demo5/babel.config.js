const customPlugin = require('./plugin.js');

module.exports = {
  presets: ['@babel/env'],
  plugins: [[customPlugin, { a: 1 }]],
};
