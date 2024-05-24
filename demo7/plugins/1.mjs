const customPlugin = function ({ types: t }, options) {
  return {
    // 访问器
    visitor: {
      Program(path) {
        // -> var a = 1;
        path.scope.push({ id: t.identifier('a'), init: t.numericLiteral(1) });

        // -> const b = "2";
        const v1 = t.variableDeclaration('const', [
          t.variableDeclarator(t.identifier('b'), t.stringLiteral('2')),
        ]);
        console.log(v1);
        path.unshiftContainer('body', v1);

        // const c = false;
        path.scope.push({
          id: t.identifier('c'),
          init: t.booleanLiteral(false),
          kind: 'const',
        });

        // let d = null;
        path.scope.push({
          id: t.identifier('d'),
          init: t.nullLiteral(),
          kind: 'let',
        });
      },
    },
  };
};

export default customPlugin;
