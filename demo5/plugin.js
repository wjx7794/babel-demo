const customPlugin = function ({ types: t }, options) {
  console.log('options>>>', options);
  return {
    // 访问器
    visitor: {
      FunctionDeclaration(path) {
        const id = path.scope.generateUidIdentifierBasedOnNode(path.node.id);
        const id2 = path.scope.generateUidIdentifierBasedOnNode(path.node.id);

        const tartget = t.variableDeclaration('let', [
          t.variableDeclarator(id, t.numericLiteral(1)),
        ]);

        path.remove();
        // var _square2 = 1;
        path.scope.parent.push({ id: id2, init: t.numericLiteral(1) });
        // let _square = 1;
        path.parentPath.unshiftContainer('body', tartget);
      },
    },
  };
};
module.exports = customPlugin;
