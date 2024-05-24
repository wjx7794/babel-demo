import babel from '@babel/core';
import * as t from '@babel/types';

let originCode = `
  function square(n) {
    return n * n;
  }
`;

let customPlugin = function () {
  return {
    // 访问器
    visitor: {
      FunctionDeclaration(path) {
        const id = path.scope.generateUidIdentifierBasedOnNode(path.node.id);
        const temp = path.node;
        path.remove();
        path.scope.parent.push({ id, init: temp });
      },
      // FunctionDeclaration(path) {
      //   const id = path.scope.generateUidIdentifierBasedOnNode(path.node.id);
      //   const id2 = path.scope.generateUidIdentifierBasedOnNode(path.node.id);

      //   const tartget = t.variableDeclaration('let', [
      //     t.variableDeclarator(id, t.numericLiteral(1)),
      //   ]);

      //   // path.replaceWith(id);

      //   // var _square2 = 1;
      //   path.scope.parent.push({ id: id2, init: t.numericLiteral(1) });
      //   // let _square = 1;
      //   path.parentPath.unshiftContainer('body', tartget);
      // },
    },
  };
};

const options = {
  plugins: [customPlugin()],
};
let res = babel.transformSync(originCode, options);
console.log(res.code);
