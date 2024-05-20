import babel from '@babel/core';
import * as t from '@babel/types';

let originCode = `
    let fn = (x) => {
      return x;
    }
`;

const print = (val) => {
  console.log(JSON.stringify(val));
};

let customPlugin = function () {
  return {
    // 访问器
    visitor: {
      Identifier(path) {
        if (path.getStatementParent()) {
          console.log('🌟>>>');
          console.log(path.node.type, path.node.name);
          console.log(path.getStatementParent().node.type); // ArrowFunctionExpression
          // print(path.getStatementParent().node);
        }
      },
    },
  };
};

const options = {
  plugins: [customPlugin()],
};
let res = babel.transformSync(originCode, options);
