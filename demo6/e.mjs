import * as t from '@babel/types';
const ast = t.binaryExpression('*', t.identifier('a'), t.identifier('b'));
console.log(JSON.stringify(ast));
