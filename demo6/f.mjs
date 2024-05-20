import { parse } from '@babel/parser';
import _generate from '@babel/generator';
const generate = _generate.default;

const code = 'class Example {}';
const ast = parse(code);

const output = generate(
  ast,
  {
    /* options */
  },
  code
);

console.log(JSON.stringify(output));
