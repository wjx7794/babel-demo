import * as t from '@babel/types';
import _template from '@babel/template';
import _generate from '@babel/generator';

const template = _template.default;
const generate = _generate.default;

const buildRequire = template(`
  var %%importName%% = require(%%source%%);
`);

const ast = buildRequire({
  importName: t.identifier('myModule'),
  source: t.stringLiteral('my-module'),
});

console.log(generate(ast).code);
