const babel = require('@babel/core');
let originCode = `
  function square(n) {
    return n * n;
  }
`;

const updateParamNameVisitor = {
  Identifier(path) {
    if (path.node.name === this.paramName) {
      path.node.name = 'x';
    }
  },
};

const MyVisitor = {
  FunctionDeclaration(path) {
    const param = path.node.params[0];
    const paramName = param.name;
    param.name = 'x';

    path.traverse(updateParamNameVisitor, { paramName });
  },
};

let customPlugin = function () {
  return {
    // 访问器
    visitor: MyVisitor,
  };
};

const options = {
  plugins: [customPlugin()],
};
let res = babel.transformSync(originCode, options);

console.dir(res.code);
