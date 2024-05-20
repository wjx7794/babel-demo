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
        // // 1. 利用 path.node.property
        // console.log(path.node.type); // BinaryExpression
        // console.log(path.node.operator); // ===
        // // 2. 使用 path 对象的 `get` 方法
        // console.log(path.get('left').node.name); // foo
        // console.log(path.get('right').node.name); // bar
        // console.log(path.get('type').node); // BinaryExpression
      },
      Program(path) {
        console.log(path.get('body.0.expression.left').node); // foo
        //console.log(path.get('body').node); // ExpressionStatement
        // console.log(path.node.body[0].type); // ExpressionStatement
      },
    },
  };
};

const options = {
  plugins: [customPlugin()],
};
let res = babel.transformSync(originCode, options);
// console.dir(res.code);
