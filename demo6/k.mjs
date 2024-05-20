import babel from '@babel/core';
import * as t from '@babel/types';

let originCode = `
  function square(n) {
    return n * n;
  }
`;

let customPlugin = function (options) {
  console.log(options);
  return {
    // pre(state) {
    //   console.log('start>>>');
    // },
    // 访问器
    visitor: {
      FunctionDeclaration(path) {
        throw path.buildCodeFrameError('Error message here');
      },
    },
    // post(state) {
    //   console.log('end>>>');
    // },
  };
};

const options = {
  plugins: [customPlugin({ opt1: true, opt2: false })],
};
let res = babel.transformSync(originCode, options);
console.log(res.code);
