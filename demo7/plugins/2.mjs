const customPlugin = function ({ types: t }, options) {
  return {
    // 访问器
    visitor: {
      Program(path) {
        // -> let a = 1;
        const variableA = t.variableDeclaration('let', [
          t.variableDeclarator(t.identifier('a'), t.numericLiteral(1)),
        ]);

        // t.functionDeclaration(id, params, body, generator, async);
        /**
         * function square(n) {
            let a = 1;
            return n * n;
          }
         */
        const v2 = t.functionDeclaration(
          t.identifier('square'),
          [t.identifier('n')],
          t.blockStatement([
            variableA,
            t.returnStatement(
              t.binaryExpression('*', t.identifier('n'), t.identifier('n'))
            ),
          ])
        );
        path.unshiftContainer('body', v2);
      },
    },
  };
};

export default customPlugin;
