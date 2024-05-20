const babel = require('@babel/core');
let originCode = `
  function square(n) {
    return n * n;
  }
`;

let customPlugin = function () {
  return {
    // 访问器
    visitor: {
      Identifier(path) {
        console.log('path', path.node);
      },
    },
  };
};

const options = {
  plugins: [customPlugin()],
};
let res = babel.transformSync(originCode, options);

console.dir(res.code);
