// const babel = require('@babel/core');
import babel from '@babel/core';
import * as t from '@babel/types';

let originCode = `
  foo === bar;
`;

let customPlugin = function () {
  return {
    // 访问器
    visitor: {
      BinaryExpression(path) {
        if (path.node.operator !== '===') {
          return;
        }

        path.node.left = t.identifier('key');
        path.node.right = t.identifier('value');
      },
    },
  };
};

const options = {
  plugins: [customPlugin()],
};
let res = babel.transformSync(originCode, options);

console.dir(res.code);
